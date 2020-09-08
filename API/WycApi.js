import axios from 'axios'

const API_KEY = "a2dc14c5-7198-4f41-8c03-0041f07a882a";
const url = "https://winyourcar.fr/api/"

const authAxios = axios.create({
    baseURL: 'https://www.winyourcar.fr/api',
    headers: {
      Accept: 'application/json',
      API_KEY: 'a2dc14c5-7198-4f41-8c03-0041f07a882a',
    },
  })

  const authAxios2 = (token) => axios.create({
    baseURL: 'https://www.winyourcar.fr/api',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer '+token,
    },
  })


export const getScores = (token) => {
    let requete = authAxios2(token)
 requete.get('http://winyourcar.fr/api/score/all').then(
        (res) => {
            let result = res
            return result
            
        },
        (err) => {
            // Works on both Android and iOS
            return false;
          });
        }