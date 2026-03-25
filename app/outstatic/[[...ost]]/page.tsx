import { Outstatic, OstSSG } from 'outstatic'
import 'outstatic/outstatic.css'

export default async function OutstaticPage() {
  const ostData = await OstSSG()
  return <Outstatic {...ostData} />
}
