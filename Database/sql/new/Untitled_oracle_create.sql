CREATE TABLE "TYPES" (
	"name" VARCHAR2(150) NOT NULL,
	constraint TYPES_PK PRIMARY KEY ("name"));


/
CREATE TABLE "BREEDS" (
	"name" VARCHAR2(150) NOT NULL,
	"type_name" VARCHAR2(150) NOT NULL,
	constraint BREEDS_PK PRIMARY KEY ("name"));


/
CREATE TABLE "PETS" (
	"id" INT NOT NULL,
	"name" VARCHAR2(150) NOT NULL,
	"gender" VARCHAR2(150) NOT NULL,
	"birth_date" TIMESTAMP NOT NULL,
	"breed_name" VARCHAR2(150) NOT NULL,
	"photo" BLOB,
	"pervious_owner" INT,
	"shelter_id" INT,
	"owner_id" INT,
	constraint PETS_PK PRIMARY KEY ("id"));

CREATE sequence "PETS_ID_SEQ";

CREATE trigger "BI_PETS_ID"
  before insert on "PETS"
  for each row
begin
  select "PETS_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "COLORS" (
	"id" INT NOT NULL,
	"name" VARCHAR2(150) NOT NULL,
	constraint COLORS_PK PRIMARY KEY ("id"));

CREATE sequence "COLORS_ID_SEQ";

CREATE trigger "BI_COLORS_ID"
  before insert on "COLORS"
  for each row
begin
  select "COLORS_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "COLOR_RECORDS" (
	"pet_id" INT NOT NULL,
	"color_id" INT NOT NULL,
	constraint COLOR_RECORDS_PK PRIMARY KEY ("pet_id","color_id"));


/
CREATE TABLE "USERS" (
	"id" INT NOT NULL,
	"username" VARCHAR2(150) NOT NULL,
	"email" VARCHAR2(150) NOT NULL,
	"password" VARCHAR2(150) NOT NULL,
	"user_type" VARCHAR2(150) NOT NULL,
	"personal_info_id" INT NOT NULL,
	"status" CHAR(1) CHECK ("status" IN ('N','Y')),
	"stmem_type" VARCHAR2(150),
	constraint USERS_PK PRIMARY KEY ("id"));

CREATE sequence "USERS_ID_SEQ";

CREATE trigger "BI_USERS_ID"
  before insert on "USERS"
  for each row
begin
  select "USERS_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "PERSONAL_INFO" (
	"id" INT NOT NULL,
	"first_name" VARCHAR2(150) NOT NULL,
	"last_name" VARCHAR2(150) NOT NULL,
	"address" VARCHAR2(150) NOT NULL,
	"phone_number" VARCHAR2(150),
	"photo" BLOB,
	constraint PERSONAL_INFO_PK PRIMARY KEY ("id"));

CREATE sequence "PERSONAL_INFO_ID_SEQ";

CREATE trigger "BI_PERSONAL_INFO_ID"
  before insert on "PERSONAL_INFO"
  for each row
begin
  select "PERSONAL_INFO_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "RATINGS" (
	"date" TIMESTAMP NOT NULL,
	"client_id" INT NOT NULL,
	"stmem_id" INT NOT NULL,
	"value" INT NOT NULL,
	constraint RATINGS_PK PRIMARY KEY ("date","client_id","stmem_id"));


/
CREATE TABLE "TRAINING_TYPES" (
	"id" INT NOT NULL,
	"name" VARCHAR2(150) NOT NULL,
	constraint TRAINING_TYPES_PK PRIMARY KEY ("id"));

CREATE sequence "TRAINING_TYPES_ID_SEQ";

CREATE trigger "BI_TRAINING_TYPES_ID"
  before insert on "TRAINING_TYPES"
  for each row
begin
  select "TRAINING_TYPES_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "TRAININGS" (
	"start_date" TIMESTAMP NOT NULL,
	"pet_id" INT NOT NULL,
	"trainer_id" INT NOT NULL,
	"training_type_id" INT NOT NULL,
	"end_date" TIMESTAMP,
	constraint TRAININGS_PK PRIMARY KEY ("start_date","pet_id","trainer_id"));


/
CREATE TABLE "TREATMENTS" (
	"date" TIMESTAMP NOT NULL,
	"doctor_id" INT NOT NULL,
	"pet_id" INT NOT NULL,
	"case_id" INT NOT NULL,
	"vaccine_id" INT,
	"prescreption_id" INT,
	constraint TREATMENTS_PK PRIMARY KEY ("date","doctor_id","pet_id"));


/
CREATE TABLE "CASES" (
	"id" INT NOT NULL,
	"name" VARCHAR2(150) NOT NULL,
	constraint CASES_PK PRIMARY KEY ("id"));

CREATE sequence "CASES_ID_SEQ";

CREATE trigger "BI_CASES_ID"
  before insert on "CASES"
  for each row
begin
  select "CASES_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "VACCINES" (
	"id" INT NOT NULL,
	"name" VARCHAR2(150) NOT NULL,
	constraint VACCINES_PK PRIMARY KEY ("id"));

CREATE sequence "VACCINES_ID_SEQ";

CREATE trigger "BI_VACCINES_ID"
  before insert on "VACCINES"
  for each row
begin
  select "VACCINES_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "PRESCRIPTIONS" (
	"id" INT NOT NULL,
	"code" VARCHAR2(150) NOT NULL,
	constraint PRESCRIPTIONS_PK PRIMARY KEY ("id"));

CREATE sequence "PRESCRIPTIONS_ID_SEQ";

CREATE trigger "BI_PRESCRIPTIONS_ID"
  before insert on "PRESCRIPTIONS"
  for each row
begin
  select "PRESCRIPTIONS_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "MEDICINE_PRESCRIPTIONS" (
	"prescription_id" INT NOT NULL,
	"medicine_id" INT NOT NULL,
	"dose" INT NOT NULL,
	constraint MEDICINE_PRESCRIPTIONS_PK PRIMARY KEY ("prescription_id","medicine_id"));


/
CREATE TABLE "MEDICINES" (
	"id" INT NOT NULL,
	"name" VARCHAR2(150) NOT NULL,
	constraint MEDICINES_PK PRIMARY KEY ("id"));

CREATE sequence "MEDICINES_ID_SEQ";

CREATE trigger "BI_MEDICINES_ID"
  before insert on "MEDICINES"
  for each row
begin
  select "MEDICINES_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "APPOINTMENTS" (
	"date" TIMESTAMP NOT NULL,
	"client_id" INT NOT NULL,
	"stmem_id" INT NOT NULL,
	"status" CHAR(1) CHECK ("status" IN ('N','Y')) NOT NULL,
	"appointment_type_id" INT NOT NULL,
	"pet_id" INT,
	constraint APPOINTMENTS_PK PRIMARY KEY ("date","client_id","stmem_id"));


/
CREATE TABLE "APPOINTMENT_TYPES" (
	"id" INT NOT NULL,
	"name" VARCHAR2(150) NOT NULL,
	constraint APPOINTMENT_TYPES_PK PRIMARY KEY ("id"));

CREATE sequence "APPOINTMENT_TYPES_ID_SEQ";

CREATE trigger "BI_APPOINTMENT_TYPES_ID"
  before insert on "APPOINTMENT_TYPES"
  for each row
begin
  select "APPOINTMENT_TYPES_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "FEE_HISTORIES" (
	"date" TIMESTAMP NOT NULL,
	"appointment_type_id" INT NOT NULL,
	"value" FLOAT NOT NULL,
	constraint FEE_HISTORIES_PK PRIMARY KEY ("date","appointment_type_id"));


/
CREATE TABLE "SHELTERS" (
	"id" INT NOT NULL,
	"capacity" INT NOT NULL,
	constraint SHELTERS_PK PRIMARY KEY ("id"));

CREATE sequence "SHELTERS_ID_SEQ";

CREATE trigger "BI_SHELTERS_ID"
  before insert on "SHELTERS"
  for each row
begin
  select "SHELTERS_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "ADOPTION_ADS" (
	"id" INT NOT NULL,
	"date" TIMESTAMP NOT NULL,
	"ad_type" VARCHAR2(150) NOT NULL,
	"status" CHAR(1) CHECK ("status" IN ('N','Y')) NOT NULL,
	"pet_id" INT NOT NULL,
	"shelter_id" INT,
	"client_id" INT,
	constraint ADOPTION_ADS_PK PRIMARY KEY ("id"));

CREATE sequence "ADOPTION_ADS_ID_SEQ";

CREATE trigger "BI_ADOPTION_ADS_ID"
  before insert on "ADOPTION_ADS"
  for each row
begin
  select "ADOPTION_ADS_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "COMMENTS" (
	"id" INT NOT NULL,
	"date" TIMESTAMP NOT NULL,
	"text" VARCHAR2(150) NOT NULL,
	"adoption_ad_id" INT NOT NULL,
	"client_id" INT NOT NULL,
	constraint COMMENTS_PK PRIMARY KEY ("id"));

CREATE sequence "COMMENTS_ID_SEQ";

CREATE trigger "BI_COMMENTS_ID"
  before insert on "COMMENTS"
  for each row
begin
  select "COMMENTS_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "ADOPTION_REQUESTS" (
	"date" TIMESTAMP NOT NULL,
	"client_id" INT NOT NULL,
	"adoption_ad_id" INT NOT NULL,
	constraint ADOPTION_REQUESTS_PK PRIMARY KEY ("client_id","adoption_ad_id"));


/

ALTER TABLE "BREEDS" ADD CONSTRAINT "BREEDS_fk0" FOREIGN KEY ("type_name") REFERENCES "TYPES"("name");

ALTER TABLE "PETS" ADD CONSTRAINT "PETS_fk0" FOREIGN KEY ("breed_name") REFERENCES "BREEDS"("name");
ALTER TABLE "PETS" ADD CONSTRAINT "PETS_fk1" FOREIGN KEY ("shelter_id") REFERENCES "SHELTERS"("id");
ALTER TABLE "PETS" ADD CONSTRAINT "PETS_fk2" FOREIGN KEY ("owner_id") REFERENCES "USERS"("id");


ALTER TABLE "COLOR_RECORDS" ADD CONSTRAINT "COLOR_RECORDS_fk0" FOREIGN KEY ("pet_id") REFERENCES "PETS"("id");
ALTER TABLE "COLOR_RECORDS" ADD CONSTRAINT "COLOR_RECORDS_fk1" FOREIGN KEY ("color_id") REFERENCES "COLORS"("id");

ALTER TABLE "USERS" ADD CONSTRAINT "USERS_fk0" FOREIGN KEY ("personal_info_id") REFERENCES "PERSONAL_INFO"("id");


ALTER TABLE "RATINGS" ADD CONSTRAINT "RATINGS_fk0" FOREIGN KEY ("client_id") REFERENCES "USERS"("id");
ALTER TABLE "RATINGS" ADD CONSTRAINT "RATINGS_fk1" FOREIGN KEY ("stmem_id") REFERENCES "USERS"("id");


ALTER TABLE "TRAININGS" ADD CONSTRAINT "TRAININGS_fk0" FOREIGN KEY ("pet_id") REFERENCES "PETS"("id");
ALTER TABLE "TRAININGS" ADD CONSTRAINT "TRAININGS_fk1" FOREIGN KEY ("trainer_id") REFERENCES "USERS"("id");
ALTER TABLE "TRAININGS" ADD CONSTRAINT "TRAININGS_fk2" FOREIGN KEY ("training_type_id") REFERENCES "TRAINING_TYPES"("id");

ALTER TABLE "TREATMENTS" ADD CONSTRAINT "TREATMENTS_fk0" FOREIGN KEY ("doctor_id") REFERENCES "USERS"("id");
ALTER TABLE "TREATMENTS" ADD CONSTRAINT "TREATMENTS_fk1" FOREIGN KEY ("pet_id") REFERENCES "PETS"("id");
ALTER TABLE "TREATMENTS" ADD CONSTRAINT "TREATMENTS_fk2" FOREIGN KEY ("case_id") REFERENCES "CASES"("id");
ALTER TABLE "TREATMENTS" ADD CONSTRAINT "TREATMENTS_fk3" FOREIGN KEY ("vaccine_id") REFERENCES "VACCINES"("id");
ALTER TABLE "TREATMENTS" ADD CONSTRAINT "TREATMENTS_fk4" FOREIGN KEY ("prescreption_id") REFERENCES "PRESCRIPTIONS"("id");




ALTER TABLE "MEDICINE_PRESCRIPTIONS" ADD CONSTRAINT "MEDICINE_PRESCRIPTIONS_fk0" FOREIGN KEY ("prescription_id") REFERENCES "PRESCRIPTIONS"("id");
ALTER TABLE "MEDICINE_PRESCRIPTIONS" ADD CONSTRAINT "MEDICINE_PRESCRIPTIONS_fk1" FOREIGN KEY ("medicine_id") REFERENCES "MEDICINES"("id");


ALTER TABLE "APPOINTMENTS" ADD CONSTRAINT "APPOINTMENTS_fk0" FOREIGN KEY ("client_id") REFERENCES "USERS"("id");
ALTER TABLE "APPOINTMENTS" ADD CONSTRAINT "APPOINTMENTS_fk1" FOREIGN KEY ("stmem_id") REFERENCES "USERS"("id");
ALTER TABLE "APPOINTMENTS" ADD CONSTRAINT "APPOINTMENTS_fk2" FOREIGN KEY ("appointment_type_id") REFERENCES "APPOINTMENT_TYPES"("id");
ALTER TABLE "APPOINTMENTS" ADD CONSTRAINT "APPOINTMENTS_fk3" FOREIGN KEY ("pet_id") REFERENCES "PETS"("id");


ALTER TABLE "FEE_HISTORIES" ADD CONSTRAINT "FEE_HISTORIES_fk0" FOREIGN KEY ("appointment_type_id") REFERENCES "APPOINTMENT_TYPES"("id");


ALTER TABLE "ADOPTION_ADS" ADD CONSTRAINT "ADOPTION_ADS_fk0" FOREIGN KEY ("pet_id") REFERENCES "PETS"("id");
ALTER TABLE "ADOPTION_ADS" ADD CONSTRAINT "ADOPTION_ADS_fk1" FOREIGN KEY ("shelter_id") REFERENCES "SHELTERS"("id");
ALTER TABLE "ADOPTION_ADS" ADD CONSTRAINT "ADOPTION_ADS_fk2" FOREIGN KEY ("client_id") REFERENCES "USERS"("id");

ALTER TABLE "COMMENTS" ADD CONSTRAINT "COMMENTS_fk0" FOREIGN KEY ("adoption_ad_id") REFERENCES "ADOPTION_ADS"("id");
ALTER TABLE "COMMENTS" ADD CONSTRAINT "COMMENTS_fk1" FOREIGN KEY ("client_id") REFERENCES "USERS"("id");

ALTER TABLE "ADOPTION_REQUESTS" ADD CONSTRAINT "ADOPTION_REQUESTS_fk0" FOREIGN KEY ("client_id") REFERENCES "USERS"("id");
ALTER TABLE "ADOPTION_REQUESTS" ADD CONSTRAINT "ADOPTION_REQUESTS_fk1" FOREIGN KEY ("adoption_ad_id") REFERENCES "ADOPTION_ADS"("id");

