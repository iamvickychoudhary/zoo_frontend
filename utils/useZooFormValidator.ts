import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
const {showToast}= useCustomToast()

const { zooFormData } = useZooFormData()

// Define the Zod schema based on your types
 function getSchema() {
  const zooLocation = zod.object({
    websiteUrl: zod.string().min(1, { message: 'website url  is required' }),
    houseNo: zod.string().min(1, { message: 'house no. is required' }),
    area: zod.string().min(1, { message: 'area is required' }),
    city: zod.string().min(1, { message: 'city is required' }),
    pincode: zod.string().min(1, { message: 'pincode is required' }),
    state: zod.string().min(1, { message: 'state is required' }),
    country: zod.string().min(1, { message: 'country is required' }),
    imgUrl: zod.string().min(1, { message: 'Image Url is required' }),
  });

  return zod.object({
    name: zod.string().min(1, 'Name is required'),
    animalTags: zod.array(zod.string()).min(1, { message: 'At least one animal tag is required' }),
    zooLocation: zooLocation,
  });
}
 export function useZooFormHandler() {

  const schema = getSchema();

  const { handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  // Fields
  const { value: name } = useField<string>('name');
  const { value: animalTags } = useField<string[]>('animalTags');
  const { value: websiteUrl } = useField<string>('zooLocation.websiteUrl');
  const { value: houseNo } = useField<string>('zooLocation.houseNo');
  const { value: area } = useField<string>('zooLocation.area');
  const { value: city } = useField<string>('zooLocation.city');
  const { value: pincode } = useField<string>('zooLocation.pincode');
  const { value: state } = useField<string>('zooLocation.state');
  const { value: country } = useField<string>('zooLocation.country');
  const { value: imgUrl } = useField<string>('zooLocation.imgUrl');

  
  const onSubmit = handleSubmit(async(values: any) => {
    console.log("submit called",values );
    const { status } = await useFetch(`http://localhost:3000/api/zoo/save`, {
        method: 'POST',
        body: JSON.stringify({ ...values })
    })
    
    return status.value
    
  });
  
  

  return {
    name,
    animalTags,
    websiteUrl,
    houseNo,
    area,
    city,
    pincode,
    state,
    country,
    imgUrl,
    errors,
    onSubmit,
    handleSubmit
  };
}
