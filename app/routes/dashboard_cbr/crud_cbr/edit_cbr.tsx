import { useState, useEffect } from "react";
import { getCbrDataById, updateCbrData } from "~/routes/database/data_cbr";
import { useNavigate, useParams } from "react-router";
import DashboardHeader from "~/components/DashboardHeader";
import { id } from "date-fns/locale";
import { format } from "date-fns";

export default function EditCbr() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama_cbr: "",
    tgl_lahir_cbr: "", // Mengubah tipe kembali menjadi string
    kelompok_cbr: "",
    kelas_sekolah_cbr: "",
    jenis_kelamin_cbr: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCbrData() {
      if (!id) {
        setError("ID data tidak ditemukan.");
        setLoading(false);
        return;
      }
      try {
        const data = await getCbrDataById(Number(id));
        if (data) {
          setFormData({
            nama_cbr: data.nama_cbr,
            tgl_lahir_cbr: data.tgl_lahir_cbr || "", // Pastikan ini string YYYY-MM-DD
            kelompok_cbr: data.kelompok_cbr,
            kelas_sekolah_cbr: data.kelas_sekolah_cbr,
            jenis_kelamin_cbr: data.jenis_kelamin_cbr,
          });
        } else {
          setError("Data tidak ditemukan.");
        }
      } catch (err: any) {
        console.error("Error fetching CBR data:", err);
        setError(err.message || "Gagal mengambil data CBR.");
      } finally {
        setLoading(false);
      }
    }
    fetchCbrData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      tgl_lahir_cbr: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!id) {
      setError("ID data tidak ditemukan untuk diperbarui.");
      return;
    }

    try {
      await updateCbrData(Number(id), formData);
      setSuccess("Data CBR berhasil diperbarui!");
      navigate("/dashboard_cbr/cbr_database"); // Redirect to database page after success
    } catch (err: any) {
      console.error("Error updating CBR data:", err);
      setError(err.message || "Gagal memperbarui data CBR.");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Memuat data...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader title="Edit Data Caberawit" bgColor="bg-green-500" />
      <div className="p-4 grow md:pl-64">
        <div className="w-full md:max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">Edit Data Caberawit</h2>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nama_cbr" className="block text-sm font-medium text-gray-500">Nama Lengkap <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="nama_cbr"
                name="nama_cbr"
                value={formData.nama_cbr}
                onChange={handleChange}
                className="text-black mt-2 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                placeholder="Masukkan nama"
                required
              />
            </div>

            {/* Layout perubahan: Jenis Kelamin dan Tanggal Lahir dalam 1 baris, 2 kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jenis_kelamin_cbr" className="block text-sm font-medium text-gray-500">Jenis Kelamin <span className="text-red-500">*</span></label>
                <select
                  id="jenis_kelamin_cbr"
                  name="jenis_kelamin_cbr"
                  value={formData.jenis_kelamin_cbr}
                  onChange={handleChange}
                  className="text-black mt-2 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  required
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div>
                <label htmlFor="tgl_lahir_cbr" className="block text-sm font-medium text-gray-500">Tanggal Lahir</label>
                <input
                  type="date"
                  id="tgl_lahir_cbr"
                  name="tgl_lahir_cbr"
                  value={formData.tgl_lahir_cbr}
                  onChange={handleDateChange}
                  className="text-black bg-gray-300 mt-2 p-2 block w-35 rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Layout perubahan: Kelas Ngaji dan Kelas Sekolah dalam 1 baris, 2 kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Field Kelompok tetap dalam 1 baris penuh */}
              <div>
                <label htmlFor="kelompok_cbr" className="block text-sm font-medium text-gray-500">Kelompok <span className="text-red-500">*</span></label>
                <select
                  id="kelompok_cbr"
                  name="kelompok_cbr"
                  value={formData.kelompok_cbr}
                  onChange={handleChange}
                  className="text-black mt-2 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  required
                >
                  <option value="">Pilih Kelompok</option>
                  <option value="Linggar">Linggar</option>
                  <option value="Parakan Muncang">Parakan Muncang</option>
                  <option value="Cikopo">Cikopo</option>
                  <option value="Bojong Koneng">Bojong Koneng</option>
                  <option value="Cikancung">Cikancung</option>
                </select>
              </div>

              <div>
                <label htmlFor="kelas_sekolah_cbr" className="block text-sm font-medium text-gray-500">Jenjang Sekolah</label>
                <select
                  id="kelas_sekolah_cbr"
                  name="kelas_sekolah_cbr"
                  value={formData.kelas_sekolah_cbr}
                  onChange={handleChange}
                  className="text-black mt-2 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                >
                  <option value="">Pilih Kelas Sekolah</option>
                  <option value="Belum Sekolah">Belum Sekolah</option>
                  <option value="PAUD">PAUD</option>
                  <option value="TK/RA">TK/RA</option>
                  <option value="Kelas 1">Kelas 1</option>
                  <option value="Kelas 2">Kelas 2</option>
                  <option value="Kelas 3">Kelas 3</option>
                  <option value="Kelas 4">Kelas 4</option>
                  <option value="Kelas 5">Kelas 5</option>
                  <option value="Kelas 6">Kelas 6</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                type="button"
                onClick={() => navigate("/dashboard_cbr/cbr_database")}
                className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-sky-500 rounded-md hover:bg-sky-600 font-medium"
              >
                Perbarui Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}