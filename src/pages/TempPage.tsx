// modules
import SelectBox from "@/modules/SelectBox.tsx";
import DatePicker from "@/modules/DatePicker.tsx";

const TempPage = () => {
    const categories = [
        { value: 'history', label: 'تاریخی' },
        { value: 'romantic', label: 'رمانتیک' },
        { value: 'action', label: 'اکشن' }
    ];

    return (
        <>
            <SelectBox
                name="genre"
                label="ژانر"
                options={categories}
                value={null}
                onChange={(value) => console.log(value)}
            />
            <DatePicker
                name="date"
                label="تاریخ"
                value={null}
                onChange={(value) => console.log(value)}
            />
        </>
    )
}

export default TempPage;