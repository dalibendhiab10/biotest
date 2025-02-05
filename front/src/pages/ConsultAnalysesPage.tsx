import NavBar from "@components/organisms/NavBar";
import { useEffect, useState } from "react";
import ListAnalyses from "@components/molecules/ListAnalyses";
import { Analyse, Biologiste, FilterAnalyse } from "types";
import LaboList from "@components/organisms/LaboList";
import SearchForm from "@components/organisms/SearchBar";
import Footer from "@components/organisms/Footer";
import { get } from "api/axiosConfig";
import Pagination from "@components/molecules/Pagination";
import AnalyseInfo from "@components/organisms/AnalyseInfo";
import PatientForm from "@components/organisms/PatientForm";
import { usePagination } from "@helpers/usePagination";


const ConsultAnalysesPage: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analyse[]>([]);
  const [biologists, setBiologists] = useState<Biologiste[]>([])
  const [isListOne, setIsListOne] = useState(true)
  // Pagination for Analyse data
  const { currentItems: currentAnalyseItems, currentPage: currentAnalysePage,
    totalPages: totalAnalysePages, handlePageChange: handleAnalysePageChange } = usePagination<Analyse>({
      data: analyses,
      itemsPerPage: 5,
    });

  // Pagination for Biologiste data
  const { currentItems: currentBiologisteItems, currentPage: currentBiologistePage,
    totalPages: totalBiologistePages, handlePageChange: handleBiologistePageChange } = usePagination<Biologiste>({
      data: biologists,
      itemsPerPage: 9,
    });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupInfoOpen, setIsPopupInfoOpen] = useState(false)
  const [analyseId, setAnalyseId] = useState<number>(0)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [analysisByLab, setAnalysisByLab] = useState<boolean>(false)
  const [currentLabId, setCurrentLabId] = useState<number>()
  const [filterAnalyse, setFilterAnalyse] = useState<FilterAnalyse>({
    examen: '',
    nature_prelevement: '',
    specialite: '',
    technique: '',
    temperature: undefined,
    tarification: undefined
  })
  const [filterActive, setFilterActive] = useState<boolean>(false)


  const currentLabName = analyses.find(analyse => analyse.biologiste?.id === currentLabId)?.biologiste?.laboratoire


  // fetching Analyses data
  useEffect(() => {
    const fetchAnalysesByLab = async () => {

      try {

        const response = await get("/aa/analyseBio")

        setAnalyses(response)

      } catch (err: any) {

        setError(err.message)

      } finally {

        setLoading(false)

      }
    }

    fetchAnalysesByLab()

  }, [])


  // fetching Biologits data
  useEffect(() => {

    const fetchBiologists = async () => {


      try {

        const response = await get("/biologiste/biologists")

        setBiologists(response)

      } catch (error: any) {

        console.error(error)

      }


    }

    fetchBiologists()

  }, [])


  return (
    <div className="flex flex-col min-h-screen">

      <NavBar currentList={isListOne} switchList={setIsListOne}
        setAnalysisByLab={setAnalysisByLab} setFilterActive={setFilterActive} />



      <h1 className="text-2xl ms-10 mt-[30px] mb-2">
        {isListOne ? "Liste des analyses" :
          (!isListOne && analysisByLab) ? (
            <>
              Liste des analyses par laboratoire <span className="text-green-green font-bold">{currentLabName}</span>
            </>
          ) : ""}
      </h1>


      {((isListOne || (!isListOne && analysisByLab)) && !loading && !error) && (<h3 className="ml-auto me-10  text-[#A9A7A7FC] mb-2  font-semibold"> {totalAnalysePages} {totalAnalysePages > 1 ? "Pages" : "Page"} </h3>)}




      {

        (isListOne && loading) ? <div className="text-center">...Loading</div> : (isListOne && error) ? <p className="text-center text-[red]">{error}</p> :
          ((isListOne || (!isListOne && analysisByLab)) && !loading) ? <ListAnalyses onOpen={() => setIsPopupOpen(true)} onOpenInfo={() => setIsPopupInfoOpen(true)}
            listAnalyseType={"analyseLab"} setAnalyseId={setAnalyseId} analyses={currentAnalyseItems}
            analysisByLab={analysisByLab} currentLabId={currentLabId} filterAnalyse={filterAnalyse} filterActive={filterActive} /> : ""
      }





      {isPopupInfoOpen && (
        <AnalyseInfo analyses={currentAnalyseItems}
          analyseId={analyseId}
          onClose={() => setIsPopupInfoOpen(false)}
        />
      )}




      {isPopupOpen && <PatientForm onClose={() => setIsPopupOpen(false)} analyseId={analyseId} />}




      {
        (!isListOne && !analysisByLab) && <LaboList biologists={currentBiologisteItems} setCurrentLabId={setCurrentLabId}
          setAnalysisByLab={setAnalysisByLab} />
      }


      {
        (isListOne || (!isListOne && analysisByLab)) && <SearchForm searchOpen={searchOpen}
          setSearchOpen={setSearchOpen} filterAnalyse={filterAnalyse}
          setFilterAnalyse={setFilterAnalyse} setFilterActive={setFilterActive} />
      }

      {
        (!loading && !error) && <Pagination
          currentPage={(isListOne || (!isListOne && analysisByLab)) ? currentAnalysePage : currentBiologistePage}
          totalPages={(isListOne || (!isListOne && analysisByLab)) ? totalAnalysePages : totalBiologistePages}
          onPageChange={(isListOne || (!isListOne && analysisByLab)) ? handleAnalysePageChange : handleBiologistePageChange}
        />
      }




      <Footer />


    </div>
  );

};

export default ConsultAnalysesPage;
