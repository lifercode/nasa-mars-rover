import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs'

import { fetchRoverInfo, fetchRoverPhotos } from '../api';
import MsgError from '../components/MsgError';
import Loader from '../components/Loader';

export default function Home() {
  const {
    isLoading: isLoadingInfo,
    error: hasErrorInfo,
    data: roverInfo
  } = useQuery({
    queryKey: ['roverInfo'],
    queryFn: fetchRoverInfo
  });

  const {
    isLoading: isLoadingPhotos,
    error: hasErrorPhoto,
    data: roverPhotos
  } = useQuery({
    queryKey: ['roverPhotos'],
    queryFn: () => fetchRoverPhotos(roverInfo?.earth_date),
    enabled: !!roverInfo?.earth_date
  });

  const isLoading = isLoadingInfo || isLoadingPhotos;
  const hasError = hasErrorInfo || hasErrorPhoto;
  const hasPhotos = roverPhotos?.length;

  return (
    <>

      <div className="py-10 flex flex-col items-center text-center">
        <img src="/nasa-logo.svg" alt="nasa-logo" />
        <h1 className="text-3xl font-bold">
          Mars Rover App
        </h1>
        <p className="text-xl">
          Decskill Interview Challenge
        </p>
      </div>

      {hasError
        ? <MsgError text="Fetch error!" />
        : (isLoading
            ? <Loader />
            : !hasPhotos && <MsgError text="No image found!" />
          )
      }

      <div className="mx-auto max-w-[900px] px-5 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roverPhotos?.map(({ id, img_src, camera, rover }) => (
            <div key={id} className="relative">
              <div className="h-full p-5 bg-slate-300 rounded">
                <div className="min-h-[230px]">
                  <img
                    src={img_src}
                    alt="nasa-logo"
                    className="w-full rounded"
                  />
                </div>
                <div>
                <p className="text-center mt-4">
                  {rover.name} - <span className="font-bold">{id}</span>
                </p>
                </div>
              </div>
              <div className="absolute top-8 right-8">
                <div className="text-xs bg-slate-500 px-2 border rounded-xl">
                  <span
                    title={camera.full_name}
                    className="text-white py-0 cursor-default"
                  >
                    {camera.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {(!isLoading && roverInfo?.earth_date) && (
        <p className="text-center mb-10">
          <small className="mr-1">Searching by date:</small>
          <span>{dayjs(roverInfo?.earth_date).format('YYYY/MM/DD')}</span>
        </p>
      )}

    </>
  )
}
