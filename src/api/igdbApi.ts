// import axiosClient from './axiosClient';

// export const category: { [key: string]: string } = {
//   game: 'games',
// };

// export const gameType: { [key: string]: string } = {
//   upcoming: 'upcoming',
//   popular: 'popular',
//   top_rated: 'top_rated',
// };

// interface IgdbApi {
//   getMoviesList(type: string, params: object): Promise<any>;
//   getTrailers(cate: string, id: number): Promise<any>;
//   search(cate: string, params: object): Promise<any>;
//   detail(cate: string, id: number, params: object): Promise<any>;
//   credits(cate: string, id: number): Promise<any>;
//   similar(cate: string, id: number): Promise<any>;
// }

// const igdbApi: IgdbApi = {
//   getMoviesList: (type: string, params: object) => {
//     const url = 'games/' + gameType[type];
//     return axiosClient.get(url, { params: params });
//   },
//   getTrailers: (cate: string, id: number) => {
//     const url = category[cate] + '/' + id + '/trailers';
//     return axiosClient.get(url, { params: {} });
//   },
//   search: (cate: string, params: object) => {
//     const url = 'search/' + category[cate];
//     return axiosClient.get(url, params);
//   },
//   detail: (cate: string, id: number, params: object) => {
//     const url = category[cate] + '/' + id;
//     return axiosClient.get(url, params);
//   },
//   credits: (cate: string, id: number) => {
//     const url = category[cate] + '/' + id + '/credits';
//     return axiosClient.get(url, { params: {} });
//   },
//   similar: (cate: string, id: number) => {
//     const url = category[cate] + '/' + id + '/similar';
//     return axiosClient.get(url, { params: {} });
//   },
// };

// export default igdbApi;