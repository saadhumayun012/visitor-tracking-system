# from fastapi import FastAPI, UploadFile, File, HTTPException, Form
# import easyocr
# import cv2
# import numpy as np
# import re
# from pydantic import BaseModel, Field, ConfigDict
# from typing import Optional
# from enum import Enum
# from datetime import date

# app = FastAPI(title="Visitor Tracking System")

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

# def convert_date(date_str):
#     """Convert DD.MM.YYYY to date object"""
#     if not date_str:
#         return None
#     try:
#         parts = date_str.split('.')
#         return date(int(parts[2]), int(parts[1]), int(parts[0]))
#     except:
#         return None

# @app.post("/scan-cnic-front")
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

# #--------
# class Purpose(Enum): 
#     IT_BRANCE = 1
#     DBO_OFFICE = 2
#     # will add more

# class VechicalDetails(BaseModel):
#     NUMBER: str
#     TYPE: str
#     COLOR: str

# class CreateUserRequest(BaseModel):
#     name: str = Field(...)
#     father_name: str = Field(...)
#     gender: bool = Field(default=True, description="1 for Male, 0 for Female") #true is male false is female
#     cnic_no: str = Field(...) # use regex
#     date_of_birth: date = Field(...)
#     cnic_date_of_issue: date = Field(...)
#     cnic_date_of_expiry: date = Field(...)
#     address: str = Field(...)
#     phone_number: str = Field(...) # use regex
#     purpose: Purpose = Field(...)
#     purpose_description: Optional[str] = None
#     vechical_availble: bool = Field(default=False)
#     vechical_description: Optional[VechicalDetails] = None
#     logistics_decription: Optional[str] = None

#     #logic of cnic of date of expiry
#     model_config = ConfigDict(
#         json_schema_extra = {
#             "examples": [
#                 {
#                     "name": "saad",
#                     "father_name": "humayun",
#                     "gender": "1",
#                     "cnic_no": "12345-67890-1",
#                     "date_of_birth": "2000-01-01",
#                     "cnic_date_of_issue": "2020-01-01",
#                     "cnic_date_of_expiry": "2025-01-01",
#                     "address": "123 Main St",
#                     "phone_number": "1234567890",
#                     "purpose": 1,
#                     "purpose_description": "For IT Brance",
#                     "vechical_availble": "true",
#                     "vechical_description": {
#                         "NUMBER": "ABC123",
#                         "TYPE": "SUV",
#                         "COLOR": "RED"
#                     },
#                     "logistics_decription": "bag, watch, phone"
#                 }
#             ]
#         }
#     )


# @app.post("/user", status_code=201)
# async def create_user(request: CreateUserRequest):
#     return {"message": "User created", "data": request}


# # ============== NEW: UNIFIED ENDPOINT ==============
# @app.post("/visitor", status_code=201)
# async def create_visitor(
#     # OCR Option: CNIC image (optional)
#     cnic_image: Optional[UploadFile] = File(None),
    
#     # Manual fields (optional if OCR, required if manual)
#     name: Optional[str] = Form(None),
#     father_name: Optional[str] = Form(None),
#     gender: Optional[bool] = Form(None),  # True=Male, False=Female
#     cnic_no: Optional[str] = Form(None),
#     date_of_birth: Optional[str] = Form(None),  # YYYY-MM-DD
#     cnic_date_of_issue: Optional[str] = Form(None),
#     cnic_date_of_expiry: Optional[str] = Form(None),
    
#     # Required fields (dono modes mein)
#     address: str = Form(...),
#     phone_number: str = Form(...),
#     purpose: int = Form(...),
#     purpose_description: Optional[str] = Form(None),
#     vechical_availble: bool = Form(False),
#     vechical_number: Optional[str] = Form(None),
#     vechical_type: Optional[str] = Form(None),
#     vechical_color: Optional[str] = Form(None),
#     logistics_decription: Optional[str] = Form(None)
# ):
#     """
#     🎯 UNIFIED ENDPOINT - Dono options available:
    
#     1️⃣ OCR MODE: cnic_image bhejo, baaki optional
#     2️⃣ MANUAL MODE: sab fields manually bhejo, cnic_image mat bhejo
#     """
    
#     ocr_data = {}
    
#     # OCR Mode
#     if cnic_image:
#         contents = await cnic_image.read()
#         nparr = np.frombuffer(contents, np.uint8)
#         img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
#         if img is None:
#             raise HTTPException(status_code=400, detail="Invalid image file")
        
#         processed = preprocess_efficient(img)
#         lines = reader.readtext(processed, detail=0, paragraph=False)
#         ocr_data = parse_cnic(lines)
    
#     # Merge logic: Manual override > OCR > None
#     final_name = name or ocr_data.get("name")
#     final_father_name = father_name or ocr_data.get("father_name")
#     final_cnic = cnic_no or ocr_data.get("cnic_no")
    
#     # Gender handling
#     if gender is not None:
#         final_gender = gender
#     else:
#         ocr_gender = ocr_data.get("gender")
#         final_gender = True if ocr_gender == "Male" else False if ocr_gender == "Female" else True
    
#     # Date handling with None check
#     final_dob = None
#     if date_of_birth:
#         try:
#             final_dob = date.fromisoformat(date_of_birth)
#         except:
#             pass
#     if not final_dob:
#         final_dob = convert_date(ocr_data.get("date_of_birth"))
    
#     final_doi = None
#     if cnic_date_of_issue:
#         try:
#             final_doi = date.fromisoformat(cnic_date_of_issue)
#         except:
#             pass
#     if not final_doi:
#         final_doi = convert_date(ocr_data.get("cnic_date_of_issue"))
    
#     final_doe = None
#     if cnic_date_of_expiry:
#         try:
#             final_doe = date.fromisoformat(cnic_date_of_expiry)
#         except:
#             pass
#     if not final_doe:
#         final_doe = convert_date(ocr_data.get("cnic_date_of_expiry"))
    
#     # Validation
#     if not final_name:
#         raise HTTPException(status_code=400, detail="Name is required (OCR failed ya manually enter karo)")
#     if not final_father_name:
#         raise HTTPException(status_code=400, detail="Father name is required (OCR failed ya manually enter karo)")
#     if not final_cnic:
#         raise HTTPException(status_code=400, detail="CNIC is required (OCR failed ya manually enter karo)")
#     if len(final_cnic) < 13:
#         raise HTTPException(status_code=400, detail=f"CNIC must be at least 13 characters. Received: '{final_cnic}'")
#     if not final_dob or not final_doi or not final_doe:
#         raise HTTPException(status_code=400, detail="All dates are required (OCR failed ya manually enter karo in YYYY-MM-DD format)")
    
#     # Vehicle details
#     vechical_desc = None
#     if vechical_availble and vechical_number and vechical_type and vechical_color:
#         vechical_desc = VechicalDetails(
#             NUMBER=vechical_number,
#             TYPE=vechical_type,
#             COLOR=vechical_color
#         )
    
#     # Create user request object
#     user_request = CreateUserRequest(
#         name=final_name,
#         father_name=final_father_name,
#         gender=final_gender,
#         cnic_no=final_cnic,
#         date_of_birth=final_dob,
#         cnic_date_of_issue=final_doi,
#         cnic_date_of_expiry=final_doe,
#         address=address,
#         phone_number=phone_number,
#         purpose=Purpose(purpose),
#         purpose_description=purpose_description,
#         vechical_availble=vechical_availble,
#         vechical_description=vechical_desc,
#         logistics_decription=logistics_decription
#     )
    
#     # Save to database here
#     # db.add(user_request)
    
#     return {
#         "message": "Visitor created successfully",
#         "mode": "OCR" if cnic_image else "Manual",
#         "data": user_request,
#         "ocr_extracted": ocr_data if ocr_data else None
#     }