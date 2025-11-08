// Untuk menghitung statistik di Dashboard CBR
import type { CbrData } from "../database/data_cbr";

export interface CbrStatistics {
  totalCbr: number;
  totalMaleCbr: number;
  totalFemaleCbr: number;

  paudData: CbrData[];
  totalPaud: number;
  belumSekolahData: CbrData[];
  belumSekolahMale: number;
  belumSekolahFemale: number;
  paudOnlyData: CbrData[];
  paudOnlyMale: number;
  paudOnlyFemale: number;
  tkRaData: CbrData[];
  tkRaMale: number;
  tkRaFemale: number;

  kelasAData: CbrData[];
  totalKelasA: number;
  kelas1Data: CbrData[];
  kelas1Male: number;
  kelas1Female: number;
  kelas2Data: CbrData[];
  kelas2Male: number;
  kelas2Female: number;

  kelasBData: CbrData[];
  totalKelasB: number;
  kelas3Data: CbrData[];
  kelas3Male: number;
  kelas3Female: number;
  kelas4Data: CbrData[];
  kelas4Male: number;
  kelas4Female: number;

  kelasCData: CbrData[];
  totalKelasC: number;
  kelas5Data: CbrData[];
  kelas5Male: number;
  kelas5Female: number;
  kelas6Data: CbrData[];
  kelas6Male: number;
  kelas6Female: number;
}

export function calculateCbrStatistics(cbrData: CbrData[]): CbrStatistics {
  // Calculate statistics for "Card Jumlah Caberawit"
  const totalCbr = cbrData.length;
  const totalMaleCbr = cbrData.filter(item => item.jenis_kelamin_cbr === 'L').length;
  const totalFemaleCbr = cbrData.filter(item => item.jenis_kelamin_cbr === 'P').length;

  // Calculate statistics for "Card Jumlah Kelas PAUD"
  const paudData = cbrData.filter(item => ['Belum Sekolah', 'PAUD', 'TK/RA'].includes(item.kelas_sekolah_cbr));
  const totalPaud = paudData.length;

  const belumSekolahData = paudData.filter(item => item.kelas_sekolah_cbr === 'Belum Sekolah');
  const belumSekolahMale = belumSekolahData.filter(item => item.jenis_kelamin_cbr === 'L').length;
  const belumSekolahFemale = belumSekolahData.filter(item => item.jenis_kelamin_cbr === 'P').length;

  const paudOnlyData = paudData.filter(item => item.kelas_sekolah_cbr === 'PAUD');
  const paudOnlyMale = paudOnlyData.filter(item => item.jenis_kelamin_cbr === 'L').length;
  const paudOnlyFemale = paudOnlyData.filter(item => item.jenis_kelamin_cbr === 'P').length;

  const tkRaData = paudData.filter(item => item.kelas_sekolah_cbr === 'TK/RA');
  const tkRaMale = tkRaData.filter(item => item.jenis_kelamin_cbr === 'L').length;
  const tkRaFemale = tkRaData.filter(item => item.jenis_kelamin_cbr === 'P').length;

  // Calculate statistics for "Card Jumlah Kelas A"
  const kelasAData = cbrData.filter(item => ['Kelas 1', 'Kelas 2'].includes(item.kelas_sekolah_cbr));
  const totalKelasA = kelasAData.length;

  const kelas1Data = kelasAData.filter(item => item.kelas_sekolah_cbr === 'Kelas 1');
  const kelas1Male = kelas1Data.filter(item => item.jenis_kelamin_cbr === 'L').length;
  const kelas1Female = kelas1Data.filter(item => item.jenis_kelamin_cbr === 'P').length;

  const kelas2Data = kelasAData.filter(item => item.kelas_sekolah_cbr === 'Kelas 2');
  const kelas2Male = kelas2Data.filter(item => item.jenis_kelamin_cbr === 'L').length;
  const kelas2Female = kelas2Data.filter(item => item.jenis_kelamin_cbr === 'P').length;

  // Calculate statistics for "Card Jumlah Kelas B"
  const kelasBData = cbrData.filter(item => ['Kelas 3', 'Kelas 4'].includes(item.kelas_sekolah_cbr));
  const totalKelasB = kelasBData.length;

  const kelas3Data = kelasBData.filter(item => item.kelas_sekolah_cbr === 'Kelas 3');
  const kelas3Male = kelas3Data.filter(item => item.jenis_kelamin_cbr === 'L').length;
  const kelas3Female = kelas3Data.filter(item => item.jenis_kelamin_cbr === 'P').length;

  const kelas4Data = kelasBData.filter(item => item.kelas_sekolah_cbr === 'Kelas 4');
  const kelas4Male = kelas4Data.filter(item => item.jenis_kelamin_cbr === 'L').length;
  const kelas4Female = kelas4Data.filter(item => item.jenis_kelamin_cbr === 'P').length;

  // Calculate statistics for "Card Jumlah Kelas C"
  const kelasCData = cbrData.filter(item => ['Kelas 5', 'Kelas 6'].includes(item.kelas_sekolah_cbr));
  const totalKelasC = kelasCData.length;

  const kelas5Data = kelasCData.filter(item => item.kelas_sekolah_cbr === 'Kelas 5');
  const kelas5Male = kelas5Data.filter(item => item.jenis_kelamin_cbr === 'L').length;
  const kelas5Female = kelas5Data.filter(item => item.jenis_kelamin_cbr === 'P').length;

  const kelas6Data = kelasCData.filter(item => item.kelas_sekolah_cbr === 'Kelas 6');
  const kelas6Male = kelas6Data.filter(item => item.jenis_kelamin_cbr === 'L').length;
  const kelas6Female = kelas6Data.filter(item => item.jenis_kelamin_cbr === 'P').length;

  return {
    totalCbr,
    totalMaleCbr,
    totalFemaleCbr,
    paudData,
    totalPaud,
    belumSekolahData,
    belumSekolahMale,
    belumSekolahFemale,
    paudOnlyData,
    paudOnlyMale,
    paudOnlyFemale,
    tkRaData,
    tkRaMale,
    tkRaFemale,
    kelasAData,
    totalKelasA,
    kelas1Data,
    kelas1Male,
    kelas1Female,
    kelas2Data,
    kelas2Male,
    kelas2Female,
    kelasBData,
    totalKelasB,
    kelas3Data,
    kelas3Male,
    kelas3Female,
    kelas4Data,
    kelas4Male,
    kelas4Female,
    kelasCData,
    totalKelasC,
    kelas5Data,
    kelas5Male,
    kelas5Female,
    kelas6Data,
    kelas6Male,
    kelas6Female,
  };
}