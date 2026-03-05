import uuid
import cv2
import re
import numpy as np
from pathlib import Path
import easyocr

# This function saves the uploaded CNIC image to disk and returns the file path. It also resizes the image if it's too large to optimize OCR performance.
UPLOAD_DIR = Path("uploads/cnic")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

def save_cnic_image(file_bytes: bytes, prefix: str) -> str:
    nparr = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    h, w = img.shape[:2] # type: ignore
    if w > 1200:
        scale = 1200 / w
        img = cv2.resize(img, None, fx=scale, fy=scale) # type: ignore

    unique_name = f"{prefix}_{uuid.uuid4()}.jpg"
    path = UPLOAD_DIR / unique_name

    cv2.imwrite(str(path), img, [cv2.IMWRITE_JPEG_QUALITY, 85]) # type: ignore
    return str(path)

_reader = None

# This function initializes and returns a singleton instance of the EasyOCR reader. It ensures that the reader is created only once and reused for subsequent OCR operations, improving performance.
def get_reader() -> easyocr.Reader:
    global _reader
    if _reader is None:
        _reader = easyocr.Reader(['en'], gpu=False)
    return _reader

# This function takes the OCR results from EasyOCR and extracts structured data such as name, father's name, CNIC number, dates
CNIC_PATTERN = re.compile(r'\d{5}[-]\d{7}[-]\d')
DATE_PATTERN = re.compile(r'\d{2}[./-]\d{2}[./-]\d{4}')

def parse_cnic_data(results: list) -> dict:
    lines = [text for (_, text, conf) in results]

    cnic_number = None
    for line in lines:
        cleaned = re.sub(
            r'(\d{5})[.\-,](\d{7})[.\-,](\d)',
            lambda m: f"{m.group(1)}-{m.group(2)}-{m.group(3)}",
            line
        )
        match = CNIC_PATTERN.search(cleaned)
        if match:
            cnic_number = match.group()
            break

    dates = []
    for line in lines:
        normalized = re.sub(r'[,]', '.', line)
        match = DATE_PATTERN.search(normalized)
        if match:
            date = match.group()
            if date not in dates:
                dates.append(date)

    def date_sort_key(d):
        parts = re.split(r'[./-]', d)
        if len(parts) == 3:
            return int(parts[2]) * 10000 + int(parts[1]) * 100 + int(parts[0])
        return 0

    dates = sorted(dates, key=date_sort_key)

    gender = None
    for _, text, conf in results:
        if re.match(r'^[MF]$', text.strip()) and conf > 0.7:
            gender = "male" if text.strip() == "M" else "female"
            break

    if not gender:
        full_text = " ".join(lines).upper()
        if re.search(r'\bMALE\b', full_text):
            gender = "male"
        elif re.search(r'\bFEMALE\b', full_text):
            gender = "female"

    if not gender and cnic_number:
        gender = "male" if int(cnic_number[-1]) % 2 != 0 else "female"

    name = None
    father_name = None

    for i, line in enumerate(lines):
        l_lower = line.lower().strip()

        if l_lower == "name" and not name:
            for j in range(i+1, min(i+3, len(lines))):
                candidate = lines[j].strip()
                if re.match(r'^[A-Za-z\s]+$', candidate) and len(candidate) > 3:
                    name = candidate.title()
                    break

        if re.search(r'father|husband', l_lower) and not father_name:
            for j in range(i+1, min(i+3, len(lines))):
                candidate = lines[j].strip()
                if re.match(r'^[A-Za-z\s]+$', candidate) and len(candidate) > 3:
                    father_name = candidate.title()
                    break

    return {
        "name": name,
        "father_name": father_name,
        "cnic_number": cnic_number,
        "date_of_birth": dates[0] if len(dates) > 0 else None,
        "date_of_issue": dates[1] if len(dates) > 1 else None,
        "date_of_expiry": dates[2] if len(dates) > 2 else None,
        "gender": gender,
    }