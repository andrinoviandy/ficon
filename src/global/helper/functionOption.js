import storeSchema from "global/store";

const optionRefByJenis = async (kd_jns, keyword) => {
  try {
    const res = await storeSchema.actions.getReferensiByJenis(kd_jns, keyword);
    if (res?.status === true) {
      const option = res?.data?.map((item) => {
        return {
          label: item?.ur_ref,
          value: item?.kd_ref,
          data: item,
        }
      })
      return (option);
    } else {
      return ([]);
    };
  } catch (error) {
    console.error(error);
  }
};

const optionPortofolio = async () => {
  try {
    const res = await storeSchema.actions.getPortofolio();
    if (res?.status === true) {
      const option = res?.data?.map((item) => {
        return {
          label: item?.portofolio,
          value: item?.portofolio_id,
          data: item,
        }
      })
      return (option);
    } else {
      return ([]);
    };
  } catch (error) {
    console.error(error);
  }
};

const optionSubReferensiByJenis = async (kd_jns, kd_ref) => {
  try {
    const res = await storeSchema.actions.getSubReferensiByJenis2(kd_jns, kd_ref);
    if (res?.status === true) {
      const option = res?.data?.map((item) => {
        return {
          label: item?.ur_ref,
          value: item?.kd_ref,
          data: item,
        }
      })
      return (option);
    } else {
      return ([]);
    };
  } catch (error) {
    console.error(error);
  }
};

const formatNPWP = (value) => {
  if (!value) return "";
  // hapus semua selain angka
  let digits = value.toString().replace(/\D/g, "");

  // format sesuai pola 3-3-2-8
  return digits.replace(
    /(\d{3})(\d{3})(\d{2})(\d{8})/,
    "$1.$2-$3.$4"
  );
}

const formatNominalSingkat = (nominal) => {
    const value = Number(nominal);

    if (!value || isNaN(value)) return "0";

    const abs = Math.abs(value);

    if (abs >= 1_000_000_000_000) {
        return `${(value / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "")} Triliun`;
    }

    if (abs >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")} Miliar`;
    }

    if (abs >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")} Juta`;
    }

    if (abs >= 1_000) {
        return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")} Ribu`;
    }

    return value.toLocaleString("id-ID");
};

export { optionRefByJenis, optionPortofolio, optionSubReferensiByJenis, formatNPWP, formatNominalSingkat };