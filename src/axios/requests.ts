import axiosInstance from ".";
import { formatISO, lastDayOfMonth } from "date-fns";

var today = new Date();
var currMonth = new Date(today.getFullYear(), today.getMonth(), 1);
var currLastDayMonth = new Date(today.getFullYear(), today.getMonth(), 0);
var lasMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
var lastMonthLastDay = new Date(today.getFullYear() - 1, today.getMonth(), 0);

export const getMessagesDashboard = async () => {
  const { data: current } = await axiosInstance.get(
    `/wa-schedules/?filters[$and][0][createdAt][$gte]=${formatISO(
      currMonth
    ).substring(0, 10)}&filters[$and][1][createdAt][$lte]=${formatISO(
      currLastDayMonth
    ).substring(0, 10)}`
  );
  const { data: last } = await axiosInstance.get(
    `/wa-schedules/?filters[createdAt][$gte]=${formatISO(lasMonth).substring(
      0,
      10
    )}&filters[createdAt][$lte]=${formatISO(lastMonthLastDay).substring(0, 10)}`
  );

  const messages = {
    currentMonth: current.meta.pagination.total,
    lastMonth: last.meta.pagination.total,
  };

  return messages;
};

export const getTrafficDevice = async () => {
  const { data: ios } = await axiosInstance.get(
    `/wa-schedules/?filters[device][$eq]=ios`
  );
  const { data: android } = await axiosInstance.get(
    `/wa-schedules/?filters[device][$eq]=android`
  );
  const { data: web } = await axiosInstance.get(
    `/wa-schedules/?filters[device][$eq]=web`
  );
  const { data: total } = await axiosInstance.get(`/wa-schedules`);
  const { data: scheduleds } = await axiosInstance.get(
    `/wa-schedules/?filters[hour][$ne]=`
  );

  const devices = {
    ios: ios.meta.pagination.total,
    android: android.meta.pagination.total,
    web: web.meta.pagination.total,
    total: total.meta.pagination.total,
    scheduleds: scheduleds.meta.pagination.total,
  };

  return devices;
};
