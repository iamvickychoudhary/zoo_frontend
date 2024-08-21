<template>
  <div>
    <BContainer>
      <BRow>
        <BCol md="11" style="padding: 12px;">
          <Search @search="handleListFilter" />
        </BCol>
        <BCol md="1" style="padding:10px">
          <a @click="showFilterRow = !showFilterRow">
            <span v-b-tooltip="'Show Filter'"><svg xmlns="http://www.w3.org/2000/svg" width="75" height="75"
                fill="currentColor" class="bi bi-filter" viewBox="0 0 25 25">
                <path
                  d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
              </svg></span>
          </a>
        </BCol>
      </BRow>
      <BRow class="mt-3 my-3" :hidden="showFilterRow">
        <BCol md="2">
          <BFormSelect v-model="selectedStatus" @change="filterByZooStatus">
            <option value="">Select Status</option>
            <option value="200">Active</option>
            <option value="100">Pending</option>
          </BFormSelect>
        </BCol>
        <BCol md="8">
          <BRow>
            <ClientOnly>
              <BCol md="4">
                <BFormInput v-model="queryFilter.filters.createdAfter" type="date" />
              </BCol>
              <BCol md="4">
                <BFormInput v-model="queryFilter.filters.createdBefore" type="date" />
              </BCol>
            </ClientOnly>

          </BRow>
        </BCol>
        <BCol md="2" class="d-flex justify-content-end">
          <BButton type="button" @click="filterByDateRange()" variant="primary" size="sm" class="mt-1">Apply
          </BButton>
        </BCol>

      </BRow>
      <BRow>
        <BCol md="12">
          <BCard header="Zoo List" header-text-variant="white" header-tag="header" header-bg-variant="dark"
            footer="Zoo List" footer-tag="footer" footer-bg-variant="success" footer-border-variant="dark"
            style="max-width: auto; ">
            <div v-if="status !== 'success'">
              <div class="text-center">
                <BSpinner />
              </div>
            </div>
            <div v-else>
              <BTableSimple responsive>
                <BThead>
                  <BTr>
                    <BTh>Name</BTh>
                    <BTh>Animal Type</BTh>
                    <BTh>Location</BTh>
                    <BTh>Created</BTh>
                    <BTh>Status</BTh>
                    <BTh>Action</BTh>
                  </BTr>
                </BThead>
                <BTbody v-for="(zooData, index) in zooList" :key="index">
                  <BTr>
                    <BTd>{{ zooData.name }}</BTd>
                    <BTd>
                      <span v-for="animalTag in zooData.animal_tags ">{{ `${animalTag} ` }} </span>
                    </BTd>
                    <BTd>{{ zooData.Locations[0].city }}, {{ zooData.Locations[0].state }},
                      {{ zooData.Locations[0].country }}</BTd>
                    <BTd>{{ formatDate(zooData.createdAt) }}</BTd>

                    <BTd>
                      <BButton pill size="sm" class="p-1 fw-bold"
                        :variant="zooData.state === '100' ? 'danger' : 'success'" @click="statusChange(zooData)">
                        {{ zooData.state === '100' ? 'Pending' : 'Active' }}
                      </BButton>
                    </BTd>
                    <BTd>
                      <a @click="openEditModal(zooData.id)"><span class="mx-2" v-b-tooltip="'Edit'">
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                            class="bi bi-pencil-square" viewBox="0 0 25 25">
                            <path
                              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                          </svg>
                        </span></a>
                      <span class="text-warning " v-b-tooltip="'View'" @click="viewAnimal(zooData.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                          class="bi bi-eye-fill" viewBox="0 0 25 25">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path
                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                      </span>
                    </BTd>
                  </BTr>
                </BTbody>

              </BTableSimple>
            </div>
          </BCard>
        </BCol>
      </BRow>
      <BRow>
        <BCol md="12" class="d-flex justify-content-center">
          <BPagination v-model="queryFilter.page" :total-rows="queryFilter.limit" />
        </BCol>
      </BRow>
    </BContainer>

    <!-- Modal component -->
    <ClientOnly>
      <BModal v-model="zooEditModalOpen" size="lg" title="ZOO EDIT" scrollable ok-only no-stacking>
          <LazyZooComponentZooEdit v-if="zooEditModalOpen" :id="zooId" />
      </BModal>
    </ClientOnly>

  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
const router = useRouter()

import { formatDate } from "~/utils/formatDateHanlder"
const { zooList, queryFilter, fetchZooDetails, statusChange, handleListFilter, filterByZooStatus, filterByDateRange, status, error } = useZooData()
const { zooEditModalOpen } = useZooFormData()

const selectedStatus = ref()
const showFilterRow = ref(true)
const zooId = ref();

onMounted(() => {
  fetchZooDetails()
});


const openEditModal = (id: number) => {
  zooId.value = id;
  zooEditModalOpen.value = true
}
const viewAnimal= (id:number)=>{
  router.push(`/animal/dashboard/${id}`)
}

</script>
