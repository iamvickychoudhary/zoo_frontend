<template>
    <div>

        <b-form-floating-label label="Animal Name" label-for="floatingName" class="my-2">
            <b-form-input id="floatingname" type="text" placeholder="zoo name" name="name" v-model="name" />
            <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="Skills" label-for="floatingTags" class="my-2">
            <BFormTags id="floatingTags" input-id="tags-limit" name="Skills" v-model="animalTags" :limit="limit"
                remove-on-delete>
            </BFormTags>
            <span v-if="errors.animalTags" class="text-danger">{{ errors.animalTags }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="age" label-for="floatingUrl" class="my-2">
            <b-form-input id="floatingUrl" type="text" placeholder="age" name="age"
                v-model="websiteUrl" />
            <span v-if="errors['zooLocation.websiteUrl']" class="text-danger">{{ errors['zooLocation.websiteUrl']
                }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="Image Url" label-for="floatingHouseNo" class="my-2">
            <b-form-input id="floatingHouseNo" type="text" placeholder="image_url" name="image.image_url"
                v-model="houseNo" />
            <span v-if="errors['zooLocation.houseNo']" class="text-danger">{{ errors['zooLocation.houseNo'] }}</span>

        </b-form-floating-label>
       
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useZooFormHandler } from '~/utils/useZooFormValidator';
// const result = ref()
// const { fetchZooDetails } = useZooData()
// const { zooAddModalOpen } = useZooFormData ()
// const { showToast } = useCustomToast()



const { name, animalTags, websiteUrl, houseNo, area, city, pincode, state, country, imgUrl, onSubmit, errors } = useZooFormHandler();
const limit = ref<number>(10)
//    const handleSubmit = async()=>{
//     result.value = await onSubmit()
//     console.log("test", result.value);
    
//     if(result.value === 'success'){
//         fetchZooDetails();
//         zooAddModalOpen.value = false;
//         showToast("Zoo Added Successfully","success")
//      }
//     }

</script>

<style scoped></style>