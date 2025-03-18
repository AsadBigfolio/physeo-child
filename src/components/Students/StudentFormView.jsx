import React, { useContext, useEffect, useState } from "react";
import TextInput from "../InputFields/Textinput";
import TextAreaInput from "../InputFields/TextAreaInput";
import SelectInput from "../InputFields/SelectInput";
import Card from "../UI/Card";
import StudentContext from "@/context/studentContext";
import { trpc } from '@/utils/trpcClient';
import { MultiSelect } from '../InputFields/MultiSelect';
import { FREEPLAN, HOUSEOPTIONS, STANDARDPLAN } from '@/utils/constant';

const StudentFormView = ({ formattedErrors, params, edit = true, plans, courses }) => {
  const standardPlanId = STANDARDPLAN
  const { student, updateStudent } = useContext(StudentContext);
  const [isStandardPlan, setIsStandardPlan] = useState(student?.subscribedPlans[0]?.plan === standardPlanId ? true : false)
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];
  const roleOptions = [
    { label: "Influencer", value: 'influencer' },
    { label: "User", value: 'user' },
    { label: "Admin", value: 'admin' },
  ]
  console.log({ student })
  return (
    <div>
      <div className="grid gap-8">
        <Card className="gap-x-[26px]">
          <div className="grid grid-cols-2 gap-x-8">
            <TextInput
              label={"First Name"}
              name={"firstName"}
              placeholder={"John"}
              type={"text"}
              error={formattedErrors.firstName}
              defaultValue={student.firstName}
              onChange={(e) => updateStudent({ firstName: e.target.value })}
            />
            <TextInput
              label={"Last Name"}
              name={"lastName"}
              placeholder={"Doe"}
              type={"text"}
              error={formattedErrors.lastName}
              defaultValue={student.lastName}
              onChange={(e) => updateStudent({ lastName: e.target.value })}
            />
            <TextInput
              label={"Username"}
              name={"userName"}
              placeholder={"John"}
              type={"text"}
              error={formattedErrors.userName}
              defaultValue={student.userName}
              onChange={(e) => updateStudent({ userName: e.target.value })}
            />
            <SelectInput
              label={"Gender"}
              name={"gender"}
              placeholder={"Slytherin"}
              options={genderOptions}
              value={student.gender}
              type={"text"}
              error={formattedErrors.houseOfLight}
              defaultValue={student.houseOfLight}
              onChange={(e) => updateStudent({ gender: e.target.value })}
            />
            <SelectInput
              label={"Role"}
              name={"role"}
              placeholder={"Slytherin"}
              options={roleOptions}
              value={student.role}
              type={"text"}
              error={formattedErrors.role}
              defaultValue={student.role}
              onChange={(e) => updateStudent({ role: e.target.value })}
            />
          </div>
        </Card>
        <Card className="gap-x-[26px]">
          <div className="grid grid-cols-2 gap-x-8">
            <TextInput
              label={"Email"}
              name={"email"}
              placeholder={"me@mail.com"}
              type={"text"}
              disabled={edit}
              error={formattedErrors.email}
              defaultValue={student.email}
              onChange={(e) => updateStudent({ email: e.target.value })}
            />
            <TextInput
              label={"Phone Number"}
              name={"phoneNumber"}
              placeholder={"+88 99556677"}
              type={"text"}
              error={formattedErrors.phoneNumber}
              defaultValue={student.phoneNumber}
              onChange={(e) => updateStudent({ phoneNumber: e.target.value })}
            />
            <SelectInput
              label={"House of Light"}
              name={"houseOfLight"}
              placeholder={"Slytherin"}
              type={"text"}
              error={formattedErrors.houseOfLight}
              defaultValue={student.houseOfLight}
              options={HOUSEOPTIONS}
              onChange={(e) => updateStudent({ houseOfLight: e.target.value })}
            />
            {plans?.length && <SelectInput
              label={"Subscription Plan"}
              name={"subscribedPlans"}
              placeholder={"Select Plan"}
              type={"text"}
              error={formattedErrors.subscribedPlans}
              defaultValue={student?.subscribedPlans?.length ? student?.subscribedPlans[0]?.plan : [FREEPLAN]}
              options={plans?.length ? plans?.map((item) => (
                { label: item.title, value: item._id }
              )) : []}
              onChange={(e) => {
                setIsStandardPlan(e.target.value === standardPlanId ? true : false)
                e.target.value !== standardPlanId && updateStudent({ selectedCourses: [] })
                return updateStudent({ subscribedPlans: [e.target.value] })
              }}
            />}
            {isStandardPlan && plans?.length && <MultiSelect
              label={"Select Courses"}
              name={"selectedCourses"}
              placeholder={"Select Courses"}
              error={formattedErrors.selectedCourses}
              defaultValue={student?.selectedCourses}
              onChange={(e) => updateStudent({ selectedCourses: e })}
              options={courses}
            />}

            {!edit && <TextInput
              label={"Password"}
              name={"password"}
              placeholder={"Enter Password"}
              type={"password"}
              isRequired={true}
              error={formattedErrors.password}
              onChange={(e) => updateStudent({ password: e.target.value })}
            />}
            {!edit && <TextInput
              label={"Re-Type Password"}
              name={"confirmPassword"}
              placeholder={"Re-Type Password"}
              type={"password"}
              isRequired={true}
              error={formattedErrors.confirmPassword}
              onChange={(e) => updateStudent({ confirmPassword: e.target.value })}
            />}
          </div>
          <TextInput
            label={"Address"}
            name={"address"}
            placeholder={"17 Street Gryfindor"}
            type={"text"}
            error={formattedErrors.address}
            defaultValue={student.address}
            onChange={(e) => updateStudent({ address: e.target.value })}
          />
          <TextAreaInput
            label={"About me"}
            name={"about"}
            placeholder={"17 Street Gryfindor"}
            type={"text"}
            error={formattedErrors.about}
            defaultValue={student.about}
            onChange={(e) => updateStudent({ about: e.target.value })}
          />
        </Card>
      </div>
    </div>
  );
};

export default StudentFormView;
