import MasterHeader from "components/Common/MasterHeader";

import Master from "./Master";

// import {useFetch} from '../../assets/useFetch'


export default function Variants() {
  return (
    <>
      <MasterHeader
        page={"Variantes genéticas"}
        description={'Gene and Variant Information'}
        // description={"Variantes encontradas en pacientes de Salud Pública"}
        menu={"Variantes"}
      />
      <Master/>
    </>
  );
}
