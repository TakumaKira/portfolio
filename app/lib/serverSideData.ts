export type Config = string

export const getServerSideData = async <DataType>() => {
  const data = await new Promise<DataType>((resolve) => setTimeout(() => resolve({ config: 'Hello, world!' } as DataType), 1000))
  return data
}
