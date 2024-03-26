import axiosInstance from ".";

export const getMessagesDashboard = async () => {
  return await axiosInstance.get(`/wa-schedules/?filters[createdAt][gt]`);
};
