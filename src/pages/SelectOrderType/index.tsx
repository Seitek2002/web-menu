import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useGetVenueQuery } from "api/Venue.api"
import { useAppDispatch } from "hooks/useAppDispatch"
import Header from "components/Header"

import Tabs from "./Tabs"

import { setVenue } from "src/store/yourFeatureSlice"

const SelectOrderType = () => {
  const { venue } = useParams();
  const dispatch = useAppDispatch();
  const { data } = useGetVenueQuery({ venueSlug: venue || '' });

  useEffect(() => {
    if(data) {
      dispatch(setVenue(data))
    }
  }, [data, dispatch])

  return (
    <div>
      <Header searchText="" setSearchText={() => {}} />
      <Tabs spots={data?.spots || []} />
    </div>
  )
}

export default SelectOrderType
