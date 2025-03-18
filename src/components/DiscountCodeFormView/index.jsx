import React from "react";
import TextInput from "@/components/InputFields/Textinput";
import SelectInput from "@/components/InputFields/SelectInput";
import Card from "@/components/UI/Card";
import { useAdminDiscountCodeStore } from '@/providers/DiscountCodeProvider';

const DiscountCodeFormView = ({ formattedErrors }) => {
  const { discountCodeData, updateDiscountCode } = useAdminDiscountCodeStore();
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card className="col-span-3">
        <TextInput
          label={"Discount Code"}
          placeholder={"Enter Discount Code"}
          type={"text"}
          name={"discountCode"}
          error={formattedErrors.discountCode}
          value={discountCodeData?.discountCode}
          onChange={(e) => updateDiscountCode({ discountCode: e.target.value })}
        />
        <TextInput
          label={"Percentage"}
          placeholder={"Enter Discount Percentage"}
          type="number"
          name={"percentage"}
          error={formattedErrors.percentage}
          value={discountCodeData?.percentage}
          onChange={(e) => updateDiscountCode({ percentage: (e.target.value) })}
        />
        <div className="mt-3">
          <SelectInput
            label={"Selection"}
            name={"selected"}
            placeholder={"Select Selection"}
            type={"text"}
            value={discountCodeData?.selected}
            error={formattedErrors.selected}
            options={[
              { label: "Selected", value: true },
              { label: "Not Selected", value: false },
            ]}
            onChange={(e) => updateDiscountCode({ selected: e.target.value === 'true' })}
          />
        </div>
      </Card>
    </div>
  );
};

export default DiscountCodeFormView;
