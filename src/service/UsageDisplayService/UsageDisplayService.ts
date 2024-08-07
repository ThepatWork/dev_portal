import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = "https://webhook.site/c676a33a-a08f-4d74-a9f4-531159acaa7f"; // อย่าลืมย้ายไปใส่ env

const apiCall = async <T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data: unknown = null
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: AxiosError | any) {
    throw error;
  }
};

const UsageDisplayService = {
  async ListUsage(): Promise<unknown> {
    //ยังไม่เสร็จ
    //สร้างเส้นนี้ขึ้นเพื่อส่งข้อมูลบางอย่างของ User ไปยัง backend แล้วให้ backend respon กลับมาเป็น ListUsage
    return await apiCall("get", "/listUsage", { });
  },
};

export default UsageDisplayService;
