<template>
    <b-container class="py-5 py-xl-8">
        <b-row class="justify-content-center">
            <b-col>
                <b-card-group deck>
                    <b-card class="mb-3" border-0>
                        <b-card-body class="p-0">
                            <h5 class="card-subtitle text-secondary mb-1">ANIMAL ADDED</h5>
                            <h3>{{ animalHistroy?.[0]?.createdAt || '' }}</h3>
                        </b-card-body>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
        <b-row class="justify-content-center">
            <b-col>
                <b-card-group deck>
                    <b-card class="mb-3" border-0>
                        <b-card-body class="p-0">
                            <h5 class="card-subtitle text-secondary mb-1">ANIMAL EDIT</h5>
                            <BTableSimple responsive>
                                <BThead>
                                    <BTr>
                                        <BTh>Old Name</BTh>
                                        <BTh>New Name</BTh>
                                    </BTr>
                                </BThead>
                                <BTbody v-for="(animalData, index) in animalHistroy" :key="index">
                                    <BTr>
                                        <BTd>{{ animalData[0].name }}</BTd>
                                        <BTd>{{ }}</BTd>
                                    </BTr>
                                </BTbody>
                            </BTableSimple>
                        </b-card-body>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
        <div v-if="animalHistroy?.[0]?.event === 'TRANSFER'">
            <b-row class="justify-content-center">
                <b-col>
                    <b-card-group deck>
                        <b-card class="mb-3" border-0>
                            <b-card-body class="p-0">
                                <h5 class="card-subtitle text-secondary mb-1">ANIMAL TRANSFER</h5>
                                <BTableSimple responsive>
                                <BThead>
                                    <BTr>
                                        <BTh>Old Zoo</BTh>
                                        <BTh>New Zoo</BTh>
                                    </BTr>
                                </BThead>
                                <BTbody v-for="(animalData, index) in animalHistroy" :key="index">
                                    <BTr>
                                        <BTd>{{ animalData.data.oldData.Zoo.name }}</BTd>
                                        <BTd>{{ animalData.data.newData.Zoo.name }}</BTd>
                                    </BTr>
                                </BTbody>
                            </BTableSimple>
                            </b-card-body>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </div>

    </b-container>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
import { formatDate } from "~/utils/formatDateHanlder"

const route = useRoute();

onMounted(() => {
    animalId.value = Number(route.params.id);
    fetchAnimalHistory()
});
const { animalId, animalHistroy, fetchAnimalHistory, status, error } = useAnimalHistoryData()

</script>

<style lang="scss" scoped></style>