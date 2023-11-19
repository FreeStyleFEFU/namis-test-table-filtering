import { ReactLevels, Response, Tags } from "../types/data";

export const mockResponse: Response = {
  success: true,
  message: "OK",
  data: {
    items: [
      {
        id: 1,
        title: null,
        description: "описание а Б  в  г д ",
        reactLevel: ReactLevels.Warning,
        enabled: true,
        dttmCreated: "2023-10-22T11:17:22",
        tags: [Tags.Alpha, Tags.Beta, Tags.Gamma],
      },
      {
        id: 2,
        title: " Заголовок ББББББ ",
        description: "описание г  д Е ж  з ",
        reactLevel: ReactLevels.Critical,
        enabled: null,
        dttmCreated: "2023-10-24T18:22:05",
        tags: [Tags.Sigma, Tags.Beta, Tags.Gamma],
      },
      {
        id: 3,
        title: " Заголовок ВВВБББ ",
        description: null,
        reactLevel: ReactLevels.Warning,
        enabled: false,
        dttmCreated: "2023-10-31T12:27:33",
        tags: [Tags.Omega, Tags.Sigma, Tags.Gamma],
      },
      {
        id: 4,
        title: " Заголовок БББВВВ ",
        description: "описание г Д е ",
        reactLevel: ReactLevels.Critical,
        enabled: true,
        dttmCreated: null,
        tags: [Tags.Alpha, Tags.Omega, Tags.Gamma],
      },
    ],
  },
};
