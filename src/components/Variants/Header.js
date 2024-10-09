import MasterHeader from "components/Common/MasterHeader";

import Master from "./Master";

// import {useFetch} from '../../assets/useFetch'


export default function Variants() {
  return (
    <>
      <MasterHeader
        page={"Variantes genéticas"}
        menu={"Variantes"}
      />
      <Master/>
    </>
  );
}
