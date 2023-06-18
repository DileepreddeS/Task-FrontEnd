import axios from "axios";

const BaseURL = "http://localhost:4000";

export const getAllTasks = () => {
  const data = axios
    .get(`${BaseURL}/tasks`)
    .then(function (response) {
      // handle success
      console.log(response);
      if (response.status === 200) return response.data.data;
      else return [];
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return [];
    });
  return data;
};

export const deleteTask = (id: string) => {
  const data = axios
    .delete(`${BaseURL}/tasks/${id}`)
    .then(function (response) {
      // handle success
      console.log(response);
      if (response.status === 200) return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return [];
    });
  return data;
};

export const createTask = (data: any) => {
  const res = axios
    .post(`${BaseURL}/tasks/`, data)
    .then(function (response) {
      // handle success
      if (response.status === 201) return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return [];
    });
  return res;
};

export const updateTask = (id: string, task: any) => {
  const data = axios
    .put(`${BaseURL}/tasks/${id}`, task)
    .then(function (response) {
      // handle success
      console.log(response);
      if (response.status === 202) return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return [];
    });
  return data;
};
