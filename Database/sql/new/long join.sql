select p.name as pet_name, bt.name as pet_type, b.name as pet_breed,
tr.date as treatment_date, cases.name as caseName, v.name as vaccine,
doctor.username as doctorUsername,
train.start_date as training_start_date,
traint.name as training_type,
trainer.username as trainerUsername
FROM pets p
left outer JOIN breeds b on p.breed_name = b.name
left outer JOIN pet_types bt on bt.name = b.type_name
left outer JOIN treatments tr on tr.pet_id = p.id
left outer JOIN cases on tr.case_id = cases.id
left outer JOIN vaccines v on v.id = tr.vaccine_id
left outer JOIN users doctor on tr.doctor_id= doctor.id
left outer JOIN trainings train on p.id = train.pet_id
left outer JOIN users trainer on trainer.id = train.trainer_id
left outer JOIN training_types traint on traint.id = train.training_type_id