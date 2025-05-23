import React from 'react';
import { useFetchData } from '../../../hooks/useFetchData.ts';
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage.tsx';
import Loader from '../../../ui/Loader/Loader.tsx';
import CurrentTable from '../../../components/CurrentTable/CurrentTable.tsx';
import Header from '../../../components/Header/Header.tsx';
import { HvoFirstData } from '../../../types/hvoData.ts';

const CurrentHvoFirst: React.FC = () => {
  const { loading, data } = useFetchData<HvoFirstData>(`hvo1-data`);

  if (loading) return <Loader />;
  if (!data) return <ErrorMessage />;

  return (
    <>
      <Header title={`ХВО щит №1`} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {data.pressures && (
          <CurrentTable sensorData={data.pressures} title="Давления" unit="кгс/cм²" />
        )}
        {data.flows && (
          <CurrentTable sensorData={data.flows} title="Расходы" unit="м³/ч" />
        )}
        {data.levels && (
          <CurrentTable sensorData={data.levels} title="Уровни" unit="мм" />
        )}
        {data.frequency && (
          <CurrentTable sensorData={data.frequency} title="Частоты" unit="% / Гц" />
        )}
        {data.task && <CurrentTable sensorData={data.task} title="Задания" unit="%" />}
        {data.others && <CurrentTable sensorData={data.others} title="Остальные параметры" />}
      </div>
    </>
  );
};

export default CurrentHvoFirst;