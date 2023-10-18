const fs= require('fs');


const connections = JSON.parse(`{
  "INT-123": ["INT-124", "INT-127", "EXIT-HM"],
  "INT-124": ["INT-123", "HEAD-OFFICE"],
  "INT-127": ["INT-123"],
  "EXIT-HM": ["INT-123"],
  "L-105B": ["INT-80"],
  "INT-80": ["L-105B", "INT-167"],
  "INT-126": ["INT-129", "HEAD-OFFICE"],
  "INT-129": ["INT-126", "L-101", "INT-130"],
  "L-101": ["INT-129", "INT-169"],
  "HEAD-OFFICE": ["INT-126", "INT-124"],
  "INT-130": ["INT-129", "HEAD-CONF"],
  "HEAD-CONF": ["INT-130"],
  "INT-167": ["INT-80", "INT-29", "INT-168"],
  "INT-29": ["INT-167", "INT-161", "ADMISSIONS", "INT-26"],
  "INT-161": ["INT-29", "INT-169", "STAIR-C-L-1"],
  "INT-169": ["INT-161", "L-101", "INT-170"],
  "INT-26": ["INT-170", "INT-29", "INT-27"],
  "INT-170": ["INT-26", "EXIT-LS", "INT-169", "INT-171"],
  "EXIT-LS": ["INT-170"],
  "INT-168": ["INT-27", "INT-167", "L-105A"],
  "INT-27": ["INT-168", "INT-171", "INT-26", "INT-32"],
  "INT-171": ["INT-27", "L-102", "INT-170", "INT-172"],
  "L-102": ["INT-171"],
  "L-103": ["INT-34", "INT-172", "LS-ASSISTANT"],
  "INT-34": ["L-103", "LS-PRINCIPAL"],
  "INT-32": ["INT-160", "INT-27", "INT-85"],
  "INT-160": ["INT-32", "INT-172", "STAIR-L-A-1"],
  "INT-172": ["INT-160", "L-103", "INT-171"],
  "LS-ASSISTANT": ["L-103"],
  "LS-PRINCIPAL": ["INT-34"],
  "INT-194": ["INT-94", "INT-198", "INT-199"],
  "INT-94": ["INT-194", "INT-99", "CAFETERIA-3", "BERLIN-GARDEN"],
  "INT-99": ["INT-94", "INT-173", "INT-100", "INT-104"],
  "INT-173": ["INT-99", "INT-163", "STAIR-M-A-1"],
  "INT-163": ["INT-173", "INT-164", "M-BATHROOM-2"],
  "INT-164": ["INT-163", "INT-68", "W-BATHROOM-2"],
  "INT-68": ["INT-164", "INT-71", "INT-162"],
  "L-104": ["INT-85"],
  "INT-85": ["L-104", "INT-32", "INT-199"],
  "INT-195": ["CAFETERIA-4", "STAIR-N-A-1", "INT-196"],
  "CAFETERIA-4": ["INT-195", "INT-95"],
  "INT-95": ["CAFETERIA-4", "INT-86", "KITCHEN-1", "INT-96"],
  "INT-86": ["INT-95", "INT-101", "KITCHEN-2"],
  "INT-101": ["INT-86", "CAFETERIA-2"],
  "INT-196": ["INT-82", "INT-195", "INT-197"],
  "INT-82": ["INT-196"],
  "INT-197": ["W-BATHROOM-3", "INT-196", "INT-198"],
  "W-BATHROOM-3": ["INT-197"],
  "INT-198": ["M-BATHROOM-3", "INT-197", "INT-194"],
  "M-BATHROOM-3": ["INT-198"],
  "STAIR-N-D-1": ["INT-177", "INT-203"],
  "INT-177": ["STAIR-N-D-1", "INT-153", "INT-178"],
  "INT-153": ["INT-177", "INT-152", "NURSE-LS"],
  "INT-152": ["INT-153", "INT-149", "A-101"],
  "INT-149": ["INT-152", "INT-155", "EXIT-ANNEX"],
  "INT-155": ["INT-149", "INT-156", "A-104"],
  "INT-156": ["INT-155", "INT-157", "A-102"],
  "INT-157": ["INT-156", "INT-150", "INT-158"],
  "INT-150": ["INT-157", "INT-151"],
  "ADMISSIONS": ["INT-29"],
  "INT-199": ["INT-85", "INT-194", "INT-202"],
  "KITCHEN-1": ["KITCHEN-2", "INT-95"],
  "KITCHEN-2": ["KITCHEN-1", "INT-89", "INT-86"],
  "INT-89": ["KITCHEN-2", "INT-93"],
  "INT-98": ["INT-105", "BERLIN-GARDEN"],
  "INT-105": ["INT-98", "INT-106"],
  "INT-96": ["INT-95", "CAFETERIA-3", "CAFETERIA-1"],
  "CAFETERIA-3": ["INT-96", "INT-94"],
  "BERLIN-GARDEN": ["INT-94", "INT-98", "INT-106"],
  "NURSE-LS": ["INT-153"],
  "A-101": ["INT-152"],
  "EXIT-ANNEX": ["INT-149"],
  "A-104": ["INT-155"],
  "INT-106": ["INT-105", "BERLIN-GARDEN", "INT-104"],
  "A-102": ["INT-156"],
  "INT-158": ["INT-159", "INT-157"],
  "INT-159": ["INT-158", "STAIR-E-A-1"],
  "EXIT-KITCHEN": ["INT-92"],
  "INT-92": ["EXIT-KITCHEN", "INT-93"],
  "INT-93": ["INT-92", "INT-89"],
  "INT-151": ["INT-150"],
  "INT-100": ["INT-38", "INT-102", "INT-99"],
  "INT-38": ["INT-100", "N-101A", "N-101"],
  "N-101A": ["INT-38"],
  "CAFETERIA-2": ["INT-101", "INT-102"],
  "INT-102": ["CAFETERIA-2", "INT-100", "CAFETERIA-1"],
  "INT-104": ["INT-99", "INT-106"],
  "CAFETERIA-1": ["INT-96", "INT-102"],
  "STAIR-E-A-1": ["INT-159"],
  "N-101": ["INT-38"],
  "INT-18": ["EXIT-MS", "INT-175"],
  "EXIT-MS": ["INT-18"],
  "M-111": ["INT-55"],
  "INT-55": ["M-111", "INT-54"],
  "M-112": ["INT-54"],
  "INT-54": ["M-112", "INT-55", "M-110"],
  "INT-52": ["M-100", "INT-175", "INT-43"],
  "M-100": ["INT-52"],
  "M-110": ["INT-43", "INT-54", "INT-56"],
  "INT-43": ["M-110", "M-101", "INT-52", "INT-44"],
  "M-101": ["INT-43"],
  "INT-56": ["M-110"],
  "M-109": ["INT-44"],
  "INT-44": ["M-109", "M-102", "INT-43", "INT-45"],
  "M-102": ["INT-44"],
  "M-108": ["INT-45"],
  "INT-45": ["M-108", "M-103", "INT-44", "INT-46"],
  "M-103": ["INT-45"],
  "M-107": ["INT-46"],
  "INT-46": ["M-107", "INT-45", "INT-47"],
  "INT-49": ["INT-51", "M-104"],
  "INT-51": ["INT-49", "INT-50", "MS-ASSISTANT"],
  "INT-50": ["INT-51", "MS-PRINCIPAL"],
  "INT-107": ["INT-47", "M-106"],
  "INT-47": ["INT-107", "INT-46", "INT-48"],
  "M-106": ["INT-107"],
  "INT-48": ["M-104", "INT-47", "INT-131"],
  "M-104": ["INT-48", "INT-49"],
  "MS-ASSISTANT": ["INT-51"],
  "MS-PRINCIPAL": ["INT-50"],
  "STAIR-M-B-1": ["INT-131"],
  "INT-131": ["STAIR-M-B-1", "INT-48", "INT-69"],
  "INT-74": ["INT-73", "INT-77"],
  "INT-73": ["INT-74", "INT-143", "INT-139", "INT-76"],
  "INT-143": ["INT-73", "INT-146", "NURSE-US"],
  "INT-146": ["INT-143", "INT-147"],
  "INT-147": ["INT-146", "INT-72", "STAIR-H-D-1"],
  "INT-72": ["INT-147", "INT-119", "INT-75"],
  "INT-70": ["INT-190", "INT-162", "INT-69"],
  "INT-190": ["INT-70", "HAWLEY-1", "U-101"],
  "HAWLEY-1": ["INT-190", "INT-7"],
  "INT-77": ["INT-74", "INT-71", "INT-76"],
  "INT-71": ["INT-77", "INT-68", "STAIR-H-F-1"],
  "INT-162": ["INT-68", "INT-70", "U-102"],
  "INT-69": ["INT-70", "INT-189", "INT-131"],
  "INT-189": ["INT-69", "EXIT-101", "MANUAL-INT-2"],
  "EXIT-101": ["INT-189"],
  "STAIR-H-F-1": ["INT-71"],
  "INT-175": ["INT-18", "INT-52", "INT-174"],
  "U-104": ["INT-139"],
  "INT-139": ["U-104", "INT-140", "INT-138", "INT-73"],
  "INT-140": ["INT-139", "STAIR-H-B-1"],
  "STAIR-H-A-1": ["INT-7"],
  "INT-7": ["STAIR-H-A-1", "HAWLEY-1", "INT-76", "U-103"],
  "INT-141": ["INT-142", "INT-134", "INT-135"],
  "INT-142": ["INT-141", "STAIR-H-C-1"],
  "EXIT-US-WEST": ["INT-132"],
  "INT-132": ["EXIT-US-WEST", "INT-134", "U-109"],
  "INT-134": ["INT-132", "INT-141", "U-108A"],
  "INT-135": ["INT-141", "INT-137", "U-108"],
  "INT-137": ["INT-135", "INT-138", "U-106", "U-107"],
  "INT-138": ["INT-137", "INT-139", "U-105"],
  "INT-76": ["INT-73", "INT-7", "INT-77", "INT-75"],
  "U-103": ["INT-7"],
  "U-109": ["INT-132"],
  "U-108": ["INT-135"],
  "U-105": ["INT-138"],
  "TRASH-ROOM": ["U-108A"],
  "U-108A": ["TRASH-ROOM", "INT-134"],
  "STAIR-H-B-1": ["INT-140"],
  "STAIR-H-C-1": ["INT-142"],
  "U-106": ["INT-137"],
  "U-107": ["INT-137"],
  "MANUAL-INT-1": ["INT-192"],
  "INT-192": ["MANUAL-INT-1", "INT-10", "HAWLEY-3"],
  "INT-10": ["INT-192", "INT-13", "INT-12"],
  "INT-13": ["INT-10", "INT-14"],
  "INT-144": ["NURSE-US"],
  "NURSE-US": ["INT-144", "INT-143"],
  "U-111": ["INT-119"],
  "INT-119": ["U-111", "U-116", "INT-148", "INT-72"],
  "U-116": ["INT-119", "U-118", "INT-166"],
  "U-118": ["U-116"],
  "STAIR-H-D-1": ["INT-147"],
  "INT-120": ["U-120", "INT-121", "INT-122"],
  "U-120": ["INT-120"],
  "INT-121": ["U-119", "INT-75", "INT-120"],
  "U-119": ["INT-121"],
  "INT-116": ["U-117", "INT-166", "INT-115"],
  "U-117": ["INT-116"],
  "INT-108": ["U-114", "EXIT-US-EAST", "INT-109"],
  "U-114": ["INT-108"],
  "INT-111": ["U-115", "INT-165", "INT-166"],
  "U-115": ["INT-111"],
  "EXIT-US-EAST": ["INT-108"],
  "INT-109": ["INT-108", "INT-165", "U-113"],
  "INT-165": ["INT-109", "INT-111", "W-BATHROOM-1"],
  "INT-166": ["INT-111", "INT-116", "STAIR-H-E-1", "U-116"],
  "INT-115": ["INT-116", "INT-148", "U-112"],
  "INT-148": ["INT-115", "INT-119", "M-BATHROOM-1"],
  "INT-75": ["INT-72", "INT-121", "INT-76"],
  "INT-122": ["INT-120", "INT-4"],
  "INT-4": ["INT-122", "INT-9"],
  "U-113": ["INT-109"],
  "U-112": ["INT-115"],
  "M-BATHROOM-1": ["INT-148"],
  "U-121": ["INT-12"],
  "INT-12": ["U-121", "INT-14", "INT-193", "INT-10"],
  "INT-14": ["INT-12", "STAIR-H-G-1", "INT-13"],
  "INT-9": ["INT-193", "INT-4"],
  "INT-193": ["INT-9", "INT-12"],
  "STAIR-H-G-1": ["INT-14"],
  "STAIR-L-A-1": ["INT-160"],
  "STAIR-C-L-1": ["INT-161"],
  "U-102": ["INT-162"],
  "M-BATHROOM-2": ["INT-163"],
  "W-BATHROOM-2": ["INT-164"],
  "W-BATHROOM-1": ["INT-165"],
  "STAIR-H-E-1": ["INT-166"],
  "L-105A": ["INT-168"],
  "STAIR-M-A-1": ["INT-173", "INT-176"],
  "INT-176": ["STAIR-M-A-1", "INT-174"],
  "INT-174": ["INT-176", "INT-175"],
  "INT-178": ["INT-177", "INT-179"],
  "INT-179": ["INT-178", "STAIR-E-B-1"],
  "STAIR-E-B-1": ["INT-179"],
  "EXIT-STAIR-N-B": ["STAIR-N-B-1"],
  "STAIR-N-B-1": ["EXIT-STAIR-N-B"],
  "MANUAL-INT-2": ["INT-189", "HAWLEY-2"],
  "HAWLEY-2": ["MANUAL-INT-2"],
  "U-101": ["INT-190"],
  "HAWLEY-3": ["INT-192"],
  "EXIT-STAIR-N-A": ["STAIR-N-A-1"],
  "STAIR-N-A-1": ["EXIT-STAIR-N-A", "INT-195"],
  "INT-202": ["INT-199", "EXIT-LINK", "INT-203"],
  "EXIT-LINK": ["INT-202"],
  "INT-203": ["STAIR-N-D-1", "INT-202"],
  "INT-37-2": ["INT-101-2", "STAIR-N-A-2", "INT-102-2"],
  "INT-101-2": ["INT-37-2", "INT-100-2", "N-209"],
  "INT-100-2": ["INT-101-2", "INT-143-2", "N-212-1"],
  "INT-143-2": ["INT-100-2", "INT-142-2", "N-208"],
  "INT-142-2": ["INT-143-2", "INT-141-2", "N-207"],
  "INT-141-2": ["INT-142-2", "INT-26-2", "N-208"],
  "INT-26-2": ["INT-141-2", "INT-92-2", "INT-93-2"],
  "INT-92-2": ["INT-26-2", "INT-91-2"],
  "INT-91-2": ["INT-92-2", "INT-140-2"],
  "INT-140-2": ["INT-91-2", "INT-90-2", "N-203"],
  "INT-90-2": ["INT-140-2", "INT-89-2"],
  "INT-89-2": ["INT-90-2", "INT-34-2", "N-201-1"],
  "INT-34-2": ["INT-89-2", "INT-135-2", "INT-148-2"],
  "INT-135-2": ["INT-34-2", "INT-20-2", "N-200"],
  "INT-20-2": ["INT-135-2", "INT-62-2", "INT-147-2"],
  "INT-62-2": ["INT-20-2", "INT-114-2", "STAIR-N-B-2", "US-COAT-ROOM"],
  "INT-114-2": ["INT-62-2", "INT-49-2", "INT-115-2"],
  "INT-49-2": ["INT-114-2", "INT-119-2", "INT-121-2"],
  "INT-119-2": ["INT-49-2", "INT-48-2", "U-209"],
  "INT-48-2": ["INT-119-2", "INT-118-2", "U-208"],
  "INT-118-2": ["INT-48-2", "INT-116-2", "U-211"],
  "INT-116-2": ["INT-118-2", "INT-117-2", "U-210"],
  "INT-117-2": ["INT-116-2", "INT-0-2", "U-212"],
  "INT-0-2": ["INT-117-2", "U-214-2", "U-213", "INT-162-2"],
  "U-214-2": ["INT-0-2"],
  "U-213": ["INT-0-2"],
  "INT-162-2": ["INT-0-2", "INT-156-2", "STAIR-H-E-2"],
  "INT-156-2": ["INT-162-2", "INT-150-2", "U-215"],
  "INT-150-2": ["INT-156-2", "INT-155-2", "INT-152-2"],
  "INT-155-2": ["INT-150-2", "INT-163-2", "U-216"],
  "INT-163-2": ["INT-155-2", "INT-52-2", "STAIR-H-D-2"],
  "INT-52-2": ["INT-163-2", "INT-47-2", "INT-154-2"],
  "INT-47-2": ["INT-52-2", "INT-46-2", "U-219"],
  "INT-46-2": ["INT-47-2", "INT-164-2", "U-220"],
  "INT-164-2": ["INT-46-2", "INT-45-2", "STAIR-H-H-2"],
  "INT-45-2": ["INT-164-2", "INT-44-2", "U-221"],
  "INT-44-2": ["INT-45-2", "INT-131-2", "U-222"],
  "INT-131-2": ["INT-44-2", "INT-1-2", "INT-132-2"],
  "INT-1-2": ["INT-131-2", "U-223", "INT-153-2"],
  "U-223": ["INT-1-2"],
  "INT-2-2": ["INT-129-2", "INT-3-2"],
  "INT-129-2": ["INT-2-2", "INT-153-2", "U-225"],
  "INT-153-2": ["INT-129-2", "INT-1-2", "U-224"],
  "INT-3-2": ["INT-2-2", "U-226", "INT-4-2"],
  "U-226": ["INT-3-2"],
  "U-228": ["INT-5-2"],
  "INT-5-2": ["U-228", "INT-4-2", "INT-132-2"],
  "INT-4-2": ["INT-5-2", "INT-3-2", "U-227"],
  "U-227": ["INT-4-2"],
  "U-229": ["INT-6-2"],
  "INT-6-2": ["U-229", "INT-132-2", "INT-56-2"],
  "INT-132-2": ["INT-6-2", "INT-5-2", "INT-131-2"],
  "M-212": ["INT-11-2"],
  "INT-11-2": ["M-212", "INT-112-2", "STAIR-M-A-2", "M-200"],
  "INT-112-2": ["INT-11-2", "INT-106-2", "M-211", "M-201"],
  "INT-106-2": ["INT-112-2", "INT-18-2", "M-BATHROOM-5"],
  "INT-18-2": ["INT-106-2", "INT-17-2", "INT-107-2", "M-202"],
  "INT-17-2": ["INT-18-2", "INT-109-2", "INT-108-2", "M-203"],
  "INT-109-2": ["INT-17-2", "INT-110-2"],
  "INT-110-2": ["INT-109-2", "INT-111-2", "M-206", "M-204"],
  "INT-111-2": ["INT-110-2", "INT-8-2", "M-205"],
  "INT-8-2": ["INT-111-2", "INT-43-2", "INT-144-2"],
  "INT-43-2": ["INT-8-2", "INT-56-2", "U-230"],
  "INT-56-2": ["INT-43-2", "INT-6-2", "INT-57-2"],
  "INT-15-2": ["INT-133-2", "INT-16-2"],
  "INT-133-2": ["INT-15-2", "INT-12-2", "INT-134-2"],
  "INT-12-2": ["INT-133-2", "INT-9-2", "INT-13-2", "STAIR-M-A-2"],
  "INT-9-2": ["INT-12-2", "INT-10-2", "INT-144-2"],
  "INT-16-2": ["INT-13-2", "INT-104-2", "INT-15-2"],
  "INT-13-2": ["INT-16-2", "INT-10-2", "INT-22-2", "INT-12-2"],
  "INT-10-2": ["INT-13-2", "INT-9-2"],
  "INT-144-2": ["INT-9-2", "INT-8-2", "STAIR-M-B-2"],
  "INT-22-2": ["INT-13-2", "INT-23-2"],
  "STAIR-M-A-2": ["INT-12-2", "INT-11-2", "STAIR-E-A-2"],
  "M-200": ["INT-11-2"],
  "INT-104-2": ["INT-16-2", "INT-105-2"],
  "M-208": ["INT-108-2"],
  "INT-108-2": ["M-208", "INT-17-2"],
  "M-203": ["INT-17-2"],
  "M-209": ["INT-107-2"],
  "INT-107-2": ["M-209", "INT-18-2"],
  "M-202": ["INT-18-2"],
  "INT-38-2": ["INT-99-2", "INT-102-2", "INT-105-2"],
  "INT-99-2": ["INT-38-2", "INT-27-2", "N-212-2"],
  "INT-27-2": ["INT-99-2", "INT-64-2", "INT-113-2"],
  "INT-64-2": ["INT-27-2", "INT-87-2", "INT-65-2"],
  "INT-87-2": ["INT-64-2", "INT-35-2", "INT-88-2"],
  "INT-35-2": ["INT-87-2", "INT-21-2", "INT-148-2"],
  "INT-21-2": ["INT-35-2", "INT-19-2", "INT-61-2", "INT-23-2"],
  "INT-19-2": ["INT-21-2", "INT-59-2", "STAIR-H-F-2"],
  "INT-59-2": ["INT-19-2", "INT-60-2"],
  "STAIR-H-F-2": ["INT-19-2"],
  "INT-147-2": ["INT-20-2", "INT-61-2", "US-SWAMP"],
  "INT-61-2": ["INT-147-2", "INT-21-2", "US-COAT-ROOM"],
  "INT-23-2": ["INT-21-2", "INT-22-2"],
  "INT-93-2": ["INT-26-2", "INT-94-2", "W-BATHROOM-4"],
  "INT-94-2": ["INT-93-2", "INT-113-2", "M-BATHROOM-4"],
  "INT-113-2": ["INT-94-2", "INT-27-2", "N-213"],
  "INT-148-2": ["INT-34-2", "INT-35-2", "US-SWAMP"],
  "STAIR-N-A-2": ["INT-37-2"],
  "INT-102-2": ["INT-37-2", "INT-38-2", "INT-103-2"],
  "INT-105-2": ["INT-38-2", "INT-66-2", "INT-104-2"],
  "INT-66-2": ["INT-105-2", "STAIR-N-D-2", "INT-77-2"],
  "STAIR-N-D-2": ["INT-66-2", "INT-39-2"],
  "INT-39-2": ["STAIR-N-D-2", "INT-86-2"],
  "INT-86-2": ["INT-39-2", "INT-81-2"],
  "INT-81-2": ["INT-86-2", "INT-82-2", "A-204"],
  "INT-82-2": ["INT-81-2", "INT-83-2", "A-200"],
  "INT-83-2": ["INT-82-2", "INT-84-2", "A-201"],
  "INT-84-2": ["INT-83-2", "INT-85-2", "A-203"],
  "INT-85-2": ["INT-84-2", "INT-40-2", "A-202"],
  "INT-40-2": ["INT-85-2", "STAIR-E-A-2"],
  "STAIR-E-A-2": ["INT-40-2", "STAIR-M-A-2"],
  "U-230": ["INT-43-2"],
  "U-222": ["INT-44-2"],
  "U-221": ["INT-45-2"],
  "U-220": ["INT-46-2"],
  "U-219": ["INT-47-2"],
  "U-208": ["INT-48-2"],
  "INT-121-2": ["INT-49-2", "INT-120-2", "U-205"],
  "INT-120-2": ["INT-121-2", "INT-122-2", "STAIR-H-C-2"],
  "INT-122-2": ["INT-120-2", "INT-123-2", "U-204"],
  "INT-123-2": ["INT-122-2", "INT-124-2", "U-202"],
  "INT-124-2": ["INT-123-2", "INT-125-2"],
  "INT-125-2": ["INT-124-2", "INT-126-2", "U-201"],
  "INT-126-2": ["INT-125-2", "INT-128-2", "STAIR-H-B-2"],
  "INT-128-2": ["INT-126-2", "INT-53-2"],
  "INT-53-2": ["INT-128-2", "INT-54-2", "INT-130-2"],
  "INT-54-2": ["INT-53-2", "INT-55-2"],
  "INT-130-2": ["INT-53-2", "INT-154-2", "U-200"],
  "INT-154-2": ["INT-130-2", "INT-52-2", "U-218"],
  "INT-55-2": ["INT-54-2", "INT-57-2"],
  "INT-57-2": ["INT-55-2", "INT-58-2", "INT-56-2"],
  "INT-58-2": ["INT-57-2", "INT-60-2"],
  "INT-60-2": ["INT-58-2", "INT-59-2"],
  "US-COAT-ROOM": ["INT-61-2", "INT-62-2"],
  "STAIR-N-B-2": ["INT-62-2"],
  "INT-65-2": ["INT-64-2", "STAIR-N-C-2"],
  "STAIR-N-C-2": ["INT-65-2"],
  "INT-79-2": ["INT-76-2", "INT-159-2", "L-201"],
  "INT-76-2": ["INT-79-2", "INT-75-2", "L-205"],
  "INT-75-2": ["INT-76-2", "INT-77-2", "L-202"],
  "INT-77-2": ["INT-75-2", "INT-66-2", "INT-158-2", "L-203"],
  "INT-69-2": ["L-206", "INT-70-2"],
  "L-206": ["INT-69-2", "INT-159-2"],
  "INT-70-2": ["INT-69-2", "INT-71-2"],
  "INT-71-2": ["INT-70-2", "INT-72-2"],
  "INT-72-2": ["INT-71-2", "INT-73-2"],
  "INT-73-2": ["INT-72-2", "INT-74-2"],
  "INT-74-2": ["INT-73-2"],
  "L-202": ["INT-75-2"],
  "L-205": ["INT-76-2"],
  "L-204": ["INT-158-2"],
  "INT-158-2": ["L-204", "INT-77-2", "STAIR-L-A-2"],
  "L-203": ["INT-77-2"],
  "INT-159-2": ["L-206", "INT-79-2", "STAIR-C-L-2"],
  "L-201": ["INT-79-2"],
  "A-204": ["INT-81-2"],
  "A-200": ["INT-82-2"],
  "A-201": ["INT-83-2"],
  "A-203": ["INT-84-2"],
  "A-202": ["INT-85-2"],
  "INT-88-2": ["INT-87-2", "N-215", "N-201-2"],
  "N-215": ["INT-88-2"],
  "N-201-2": ["INT-88-2"],
  "N-201-1": ["INT-89-2"],
  "W-BATHROOM-4": ["INT-93-2"],
  "M-BATHROOM-4": ["INT-94-2"],
  "N-212-2": ["INT-99-2"],
  "N-212-1": ["INT-100-2"],
  "N-209": ["INT-101-2"],
  "INT-103-2": ["INT-102-2", "N-210", "N-211"],
  "N-210": ["INT-103-2"],
  "N-211": ["INT-103-2"],
  "M-BATHROOM-5": ["INT-106-2"],
  "M-206": ["INT-110-2"],
  "M-204": ["INT-110-2"],
  "M-205": ["INT-111-2"],
  "M-211": ["INT-112-2"],
  "M-201": ["INT-112-2"],
  "N-213": ["INT-113-2"],
  "INT-115-2": ["INT-114-2", "U-206", "U-207"],
  "U-206": ["INT-115-2"],
  "U-207": ["INT-115-2"],
  "U-210": ["INT-116-2"],
  "U-212": ["INT-117-2"],
  "U-211": ["INT-118-2"],
  "U-209": ["INT-119-2"],
  "STAIR-H-C-2": ["INT-120-2"],
  "U-205": ["INT-121-2"],
  "U-204": ["INT-122-2"],
  "U-202": ["INT-123-2"],
  "U-201": ["INT-125-2"],
  "STAIR-H-B-2": ["INT-126-2"],
  "U-225": ["INT-129-2"],
  "U-200": ["INT-130-2"],
  "INT-134-2": ["INT-133-2"],
  "N-200": ["INT-135-2", "INT-137-2"],
  "US-CONFERENCE-ROOM": ["INT-139-2"],
  "INT-139-2": ["US-CONFERENCE-ROOM", "INT-138-2", "US-ASSISTANT-PRINCIPAL"],
  "INT-138-2": ["INT-139-2", "INT-137-2", "US-PRINCIPAL"],
  "INT-137-2": ["INT-138-2", "N-200", "US-DEAN-OF-STUDENT-LIFE"],
  "US-DEAN-OF-STUDENT-LIFE": ["INT-137-2"],
  "US-PRINCIPAL": ["INT-138-2"],
  "US-ASSISTANT-PRINCIPAL": ["INT-139-2"],
  "N-203": ["INT-140-2"],
  "N-208": ["INT-141-2", "INT-143-2"],
  "N-207": ["INT-142-2"],
  "STAIR-M-B-2": ["INT-144-2"],
  "US-SWAMP": ["INT-148-2", "INT-147-2"],
  "INT-152-2": ["INT-150-2", "INT-151-2", "U-214-1"],
  "INT-151-2": ["INT-152-2"],
  "U-214-1": ["INT-152-2"],
  "U-224": ["INT-153-2"],
  "U-218": ["INT-154-2"],
  "U-216": ["INT-155-2"],
  "U-215": ["INT-156-2"],
  "STAIR-L-A-2": ["INT-158-2"],
  "STAIR-C-L-2": ["INT-159-2"],
  "STAIR-H-E-2": ["INT-162-2"],
  "STAIR-H-D-2": ["INT-163-2"],
  "STAIR-H-H-2": ["INT-164-2"]
}`)

let result = {}
let temp = Object.keys(connections)
temp.sort()
temp.forEach((name)=>{
  result[name] = connections[name]
})
fs.writeFileSync("connections.json", JSON.stringify(result))