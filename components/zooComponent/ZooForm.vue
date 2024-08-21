<template>
    <div>

        <b-form-floating-label label="Zoo Name" label-for="floatingName" class="my-2">
            <b-form-input id="floatingname" type="text" placeholder="zoo name" name="name" v-model="name" />
            <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="Animal Tags" label-for="floatingTags" class="my-2">
            <BFormTags id="floatingTags" input-id="tags-limit" name="animalTags" v-model="animalTags" :limit="limit"
                remove-on-delete>
            </BFormTags>
            <span v-if="errors.animalTags" class="text-danger">{{ errors.animalTags }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="Website Url" label-for="floatingUrl" class="my-2">
            <b-form-input id="floatingUrl" type="text" placeholder="website url" name="zooLocation.websiteUrl'"
                v-model="websiteUrl" />
            <span v-if="errors['zooLocation.websiteUrl']" class="text-danger">{{ errors['zooLocation.websiteUrl']
                }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="House Number" label-for="floatingHouseNo" class="my-2">
            <b-form-input id="floatingHouseNo" type="text" placeholder="website url" name="zooLocation.houseNo"
                v-model="houseNo" />
            <span v-if="errors['zooLocation.houseNo']" class="text-danger">{{ errors['zooLocation.houseNo'] }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="Area" label-for="floatingArea" class="my-2">
            <b-form-input id="floatingArea" type="text" placeholder="town" name="zooLocation.area" v-model="area" />
            <span v-if="errors['zooLocation.area']" class="text-danger">{{ errors['zooLocation.area'] }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="City" label-for="floatingCity" class="my-2">
            <b-form-input id="floatingCity" type="text" placeholder="city" name="zooLocation.city" v-model="city" />
            <span v-if="errors['zooLocation.city']" class="text-danger">{{ errors['zooLocation.city'] }}</span>
        </b-form-floating-label>
        <b-form-floating-label label="Pincode" label-for="floatingPincode" class="my-2">
            <b-form-input id="floatingPincode" type="text" placeholder="pincode" name="zooLocation.pincode"
                v-model="pincode" />
            <span v-if="errors['zooLocation.pincode']" class="text-danger">{{ errors['zooLocation.pincode'] }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="State" label-for="floatingState" class="my-2">
            <b-form-input id="floatingState" type="text" placeholder="state" name="zooLocation.state" v-model="state" />
            <span v-if="errors['zooLocation.state']" class="text-danger">{{ errors['zooLocation.state'] }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="Country" label-for="floatingCountry" class="my-2">
            <b-form-input id="floatingCountry" type="text" placeholder="country" name="zooLocation.country"
                v-model="country" />
            <span v-if="errors['zooLocation.country']" class="text-danger">{{ errors['zooLocation.country'] }}</span>

        </b-form-floating-label>
        <b-form-floating-label label="Image Url" label-for="floatingImage" class="my-2">
            <b-form-input id="floatingImage" type="text" placeholder="image url" name="zooLocation.imgUrl"
                v-model="imgUrl" />
            <span v-if="errors['zooLocation.imgUrl']" class="text-danger">{{ errors['zooLocation.imgUrl'] }}</span>

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