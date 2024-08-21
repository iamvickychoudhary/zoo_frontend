import { useState } from '#app';
import type { Ref } from 'vue';
import type { animalDetails, animalQueryfilter } from '../types/animalType';
import { useCustomToast } from "~/composables/useCustomToast"

export const useAnimalData = () => {
  const { showToast } = useCustomToast()
  const animalList: Ref<animalDetails[]> = useState('animalList', () => []);
  // responsible for modalPopupOpen
  const animalAddModalOpen = useState('animalAddModalOpen', () => false);
  const animalEditModalOpen = useState('animalEditModalOpen', () => false);

  const animalQueryfilter: Ref<animalQueryfilter> = useState('animalQueryfilter', () => ({
    searchText: {
      name: ""
    },
    filters: {
      state: "",
      createdAfter: "",
      createdBefore: ""
    },
    page: 1,
    limit: 10,
  }));
  
  let zooId = useState('zooId', () => 0);

  const { status, data: animalData, error, execute } = useFetch<animalDetails | undefined>(`http://localhost:4000/api/v1/animals/list/${zooId.value}`, {
    method: 'POST',
    body: animalQueryfilter.value,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const fetchAnimalDetails = () => {
    const { status, data: animalData, error, execute } = useFetch<animalDetails | undefined>(`http://localhost:4000/api/v1/animals/list/${zooId.value}`, {
      method: 'POST',
      body: animalQueryfilter.value,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    animalList.value = [];
    try {
      execute()
        .then(() => {
          if (status.value === "success") {
            animalList.value = [...animalData.value];
          }
          else {
            navigateTo('/login')
          }

        })
        .catch(error => {
          console.error("An error occurred:", error);
        });

      animalList.value = animalData.value || [];
    } catch (err) {
      console.error('Error fetching zoo details:', err);
    }
  };

  const statusChange = async (animalData: animalDetails) => {
    let stateCode: string = ''
    if (animalData.state === '100') {
      stateCode = '200';
    } else {
      stateCode = '100';
    }
    const res = confirm("Are you sure you want to change the Status?")
    if (res) {
      const { status, data: zooStatus } = await useFetch(`http://localhost:4000/api/v1/animals/${animalData.id}/deactivate`, {
        method: 'POST',
        body: JSON.stringify({ state: stateCode })
      })

      if (status.value === "success") {
        fetchAnimalDetails()
        showToast("Status has been changed successfully")
      }
      else {
        showToast("Failed !!!", "danger")
      }

    }

  }

  const handleListFilter = (search: any) => {
    animalQueryfilter.value.searchText.name = search
    execute().then(() => animalList.value = [...animalData.value]
    )
  }

  const filterByAnimalStatus = (event: any) => {
    const value = event.target.value;
    if (value !== "") {
      animalQueryfilter.value.filters.state = value;
      execute().then(() => animalList.value = [...animalData.value])
    } else {
      animalQueryfilter.value.filters.state = value;
      execute().then(() => animalList.value = [...animalData.value])

    }

  }

  const filterByDateRange = () => {
    execute().then(() => animalList.value = [...animalData.value])
  }


  return {
    zooId,
    animalList,
    animalQueryfilter,
    animalAddModalOpen,
    fetchAnimalDetails,
    statusChange,
    handleListFilter,
    filterByAnimalStatus,
    filterByDateRange,
    status,
    error,
  };
};
