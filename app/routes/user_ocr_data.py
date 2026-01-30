# from fastapi import APIRouter, UploadFile, File, HTTPException
# import easyocr
# import cv2
# import numpy as np
# import re


# router = APIRouter(
#     prefix =  "/users",
#     tags = ["Users"]
# )

# # 1. Global Reader (Ek baar load hoga)
# # 'quantize=True' CPU speed barhata hai
# reader = easyocr.Reader(['en'], gpu=False)

# # 2. Optimized Compiled Patterns (Claude's logic)
# CNIC_PATTERN = re.compile(r"\d{5}-\d{7}-\d")
# DATE_PATTERN = re.compile(r"\d{2}\.\d{2}\.\d{4}")
# GENDER_M_PATTERN = re.compile(r"\b(?:M|MALE)\b")
# GENDER_F_PATTERN = re.compile(r"\b(?:F|FEMALE)\b")
# PAKISTAN_PATTERN = re.compile(r"PAKISTAN")

# def preprocess_efficient(img):
#     """Fastest way to prepare image for EasyOCR"""
#     h, w = img.shape[:2]
#     # Speed ke liye 1000px width kafi hai
#     target_w = 1000
#     scale = target_w / w
#     img = cv2.resize(img, (target_w, int(h * scale)), interpolation=cv2.INTER_AREA)
    
#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#     # Simple blur noise hatane ke liye (fast)
#     return cv2.GaussianBlur(gray, (3,3), 0)

# def parse_cnic(lines):
#     # Ek baar join, ek baar upper (Speed boost)
#     full_content = " ".join(lines).upper()
    
#     # CNIC & Dates
#     cnic_match = CNIC_PATTERN.search(full_content)
#     cnic_no = cnic_match.group() if cnic_match else None
#     dates = DATE_PATTERN.findall(full_content)
    
#     # Gender Logic
#     gender = None
#     if GENDER_M_PATTERN.search(full_content):
#         gender = "Male"
#     elif GENDER_F_PATTERN.search(full_content):
#         gender = "Female"
#     elif cnic_no: # Fallback
#         try:
#             gender = "Male" if int(cnic_no[-1]) % 2 != 0 else "Female"
#         except: pass
    
#     # Name & Father Name Logic
#     name = father_name = None
#     for i, line in enumerate(lines):
#         l_lower = line.lower()
#         if l_lower == "name" and i + 1 < len(lines):
#             name = lines[i + 1].strip().title()
#         elif "father" in l_lower and i + 1 < len(lines):
#             father_name = lines[i + 1].strip().title()
            
#     return {
#         "name": name,
#         "father_name": father_name,
#         "country_of_stay": "Pakistan" if PAKISTAN_PATTERN.search(full_content) else None,
#         "gender": gender,
#         "cnic_no": cnic_no,
#         "date_of_birth": dates[0] if len(dates) > 0 else None,
#         "cnic_date_of_issue": dates[1] if len(dates) > 1 else None,
#         "cnic_date_of_expiry": dates[2] if len(dates) > 2 else None
#     }

# @router.post("/scan-cnic-front")
# async def scan_cnic_front(file: UploadFile = File(...)):
#     # 1. Image Load
#     contents = await file.read()
#     nparr = np.frombuffer(contents, np.uint8)
#     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
#     # 2. Fast Processing
#     processed = preprocess_efficient(img)
    
#     # 3. OCR (The heavy part)
#     # paragraph=False zaruri hai taake labels alag rahein
#     lines = reader.readtext(processed, detail=0, paragraph=False)
    
#     # 4. Final Parse
#     result = parse_cnic(lines)
    
#     return {"status": "success", "data": result}