import { useEffect, useState } from 'react';
import configurationService from '../service/configuration';

export function useGetAPIConfiguration() {
  const [config, setConfig] = useState();

  useEffect(() => {
    const date = new Date();
    const _getConfiguration = async () => {
      const res = await configurationService.getConfiguration();
      setConfig({ ...res, lastUpdatedAt: date.getTime() });
      localStorage.setItem('config', JSON.stringify({ ...res, lastUpdatedAt: date.getTime() }));
    };

    const storedConfig = JSON.parse(localStorage.getItem('config'));
    if (!storedConfig || storedConfig.lastUpdatedAt + THREE_DAYS_IN_MILLISECONDS < date.getTime()) {
      _getConfiguration();
    } else {
      setConfig(JSON.parse(localStorage.getItem('config')));
    }
  }, []);

  return config;
}

const THREE_DAYS_IN_MILLISECONDS = 3 * 24 * 60 * 60 * 1000;
