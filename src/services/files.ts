import { get_token } from "./globals";

export async function add_images(data_form: FormData) {
  const res = await fetch(`/api/image`, {
    method: "POST",
    body: data_form,
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}

export function add_file(
  file: any,
  token: String | null = get_token()
): Promise<any> {
  if (!token)
    return new Promise((resolve, reject) => {
      resolve(null);
      reject(null);
    });
  return fetch(`/api/file`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: file,
  });
}
export function createDataFormFiles(files: FileList) {
  const data_form = new FormData();
  for (let i = 0; i < files.length; i++) {
      data_form.append(files[i].name, files[i]);
  }
  return data_form;
}

export function resetDataForm(dataForm: FormData) {
  console.log("resetDataForm")
  console.log(dataForm)
  dataForm = new FormData();
}

export function appendDataFormFiles(dataForm: FormData, files: FileList) {
  for (let i = 0; i < files.length; i++)
      dataForm.append(files[i].name, files[i]);
  return dataForm;
}
export function print_dataForm(data_form: FormData) {
  console.log("print_data_form function")
  for (const pair of data_form.entries()) { console.log(pair[0] + ", " + pair[1]) }
}

export function isFormDataEmpty(formData: FormData) {
  return formData.entries().next().done;
}
