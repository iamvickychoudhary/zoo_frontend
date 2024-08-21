import { useState } from '#app';
import type { Ref } from 'vue';
import type { animalDetails, animalQueryfilter } from '../types/animalType';
import { useCustomToast } from "~/composables/useCustomToast"

export const useAnimalHistoryData = () => {
  const { showToast } = useCustomToast()

  const animalHistroy: Ref<any> = useState('animalHistroy', () => []);


  const animalHistoryQuery: Ref<any> = useState('animalHistoryQuery', () => ({
    filterType: "",
    year: ""
  }));

  let animalId = useState('animalId', () => 0);


  const { status, data: animalData, error, execute } = useFetch<animalDetails | undefined>(`http://localhost:4000/api/v1/animals/history/${animalId.value}`, {
    method: 'POST',
    body: animalHistoryQuery.value,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const fetchAnimalHistory = () => {
    const { status, data: animalData, error, execute } = useFetch<animalDetails | undefined>(`http://localhost:4000/api/v1/animals/history/${animalId.value}`, {
      method: 'POST',
      body: animalHistoryQuery.value,
      headers: {
        'Content-Type': 'application/json'
      },
    });

    animalHistroy.value = [];

    execute()
        .then(() => {
          if (status.value === "success") {
            animalHistroy.value = [...animalData.value];
          }
          // else {
          //   navigateTo('/login')
          // }
          
        })
        .catch(error => {
          console.error("An error occurred:", error);
        });

        animalHistroy.value = animalData.value || [];
  
  };

  // const filterByDateRange = () => {
  //   execute().then(() => animalHistroy.value = [...animalData.value])
  // }


  return {
    animalId,
    animalHistroy,
    animalHistoryQuery,
    fetchAnimalHistory,
    // filterByDateRange,
    status,
    error,
  };
};
