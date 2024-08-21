import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export function getSchema() {
    return zod.object({
      name: zod.string().min(1, { message: 'This is required' }),
      animalTags: zod.array(zod.string()).min(1, { message: 'At least one animal tag is required' }),
      zooLocation: zod.object({
        websiteUrl: zod.string().min(1, { message: 'This is required' }),
        houseNo: zod.string().min(1, { message: 'This is required' }),
        area: zod.string().min(1, { message: 'area is required' }),
        city: zod.string().min(1, { message: 'This is required' }),
        pincode: zod.string().min(1, { message: 'animal is required' }),
        state: zod.string().min(1, { message: 'animal is required' }),
        country: zod.string().min(1, { message: 'animal is required' }),
        imgUrl: zod.string().min(1, { message: 'animal is required' }),
      }),
    });
  }
  
  export function zooFormHandler() {
    const schema = getSchema();
  
    const { handleSubmit, errors } = useForm({
      validationSchema: toTypedSchema(schema),
    });
    const { value: zooId } = useField<any>('zooId');
    const { value: name } = useField<string>('name');
    const { value: animalTags } = useField<[]>('animalTags');
    const { value: zooLocation } = useField<{
      websiteUrl: string;
      houseNo: string;
      area: string;
      city: string;
      pincode: string;
      state: string;
      country: string;
      imgUrl: string;
    }>('zooLocation');
  
    const onSubmit = handleSubmit(async (values: any) => {
      try {
        const zooData = {...values}
        console.log(zooData);
        

        const { status, data: zooSaveResponse } = await useFetch(`http://localhost:3000/api/zoo/save`, {
            method: 'POST',
            body: JSON.stringify({ ...zooData })
          })
          
          return status.value
          
      } catch (error) {
        console.error("Error occurred during form submission", error);
      }
    });
    const onUpdate = handleSubmit(async (values: any) => {
        try {
          
          const zooData = {...values}
          const { status, data: zooSaveResponse } = await useFetch(`http://localhost:3000/api/zoo/${zooId.value}`, {
            method: 'PUT',
            body: JSON.stringify({ ...zooData })
          })
          return status.value

        } catch (error) {
          console.error("Error occurred during form submission", error);
        }
      });
  
    return {
      zooId,
      name,
      animalTags,
      zooLocation,
      errors,
      onSubmit,
      onUpdate,
    };
  }