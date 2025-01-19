import { DatePicker, DateValue } from "@nextui-org/react";

export default function DatePickerC({onChange}: {onChange: (date: string) => void}) {


    const handleDateChange = (value: DateValue | null) => {
      const selectedDate = value ? value.toString() : "";
      onChange(selectedDate);
    };

    return (
      <>
        <DatePicker
          onChange={handleDateChange}
          name="dia"
          disableAnimation
          isRequired
          label="Birth date "
        />{" "}
        {/* disableAnimation - porque no es conbatible con la version de react*/}
      </>
    );
};

