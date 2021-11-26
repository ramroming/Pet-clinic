select * 
FROM treatments tr
INNER JOIN users v ON v.id = tr.doctor_id
INNER JOIN pets p ON p.id = tr.pet_id
INNER JOIN cases c on c.id = tr.case_id
INNER JOIN prescriptions pr on pr.id = tr.prescription_id
INNER JOIN medicine_prescriptions mp on mp.prescription_id = pr.id
INNER JOIN medicines med on med.id = mp.medicine_id
INNER JOIN vaccines va on va.id = tr.vaccine
 