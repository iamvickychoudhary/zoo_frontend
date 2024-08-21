<template>
    <div>
        <b-form @submit.prevent="handleSubmit">
            <LazyZooComponentZooForm v-model="zooFormData" />
            <b-button type="submit" variant="primary" class="mt-3 mx-auto d-block">
                Update
            </b-button>
        </b-form>

    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useZooFormData } from "~/composables/zooForm"
import { useZooData } from "~/composables/zooStore"
import {useCustomToast} from "~/composables/useCustomToast"

const {showToast}= useCustomToast()
const response = ref('')
const { fetchZooDetails } = useZooData()
const { zooFormData, zooEditModalOpen, fetchZooDetailById, zooUpdate,  } = useZooFormData()


onMounted(async () => {
    fetchZooDetailById(props.id)
});
const props = defineProps({
    id: {
        type: Number,
        required: false
    }
});


const handleSubmit = async () => {
    response.value = await zooUpdate()
    if (response.value === 'success') {
        fetchZooDetails()
        zooEditModalOpen.value = false
        showToast("Zoo Updated Successfully", "success")
    }
    else{
        showToast("error", "danger")
    }
}


</script>

<style lang="scss" scoped></style>