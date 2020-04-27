import React, {useState} from 'react'
import {Query} from "react-apollo";
import {ALL_PROJECTS_AGGREGATED_QUERY} from "../../Projects/allProjectsGQL";
import {addDays} from "../../../utils/dates";
import styles from './VolumeChart.module.scss'
import PageLoader from "../../../components/Loader/PageLoader";

const NOW = new Date()

const VolumeChart = () => {
  const [interval, setInterval] = useState(30)

  const variables = {
    from: addDays(NOW, (-1) * interval).toISOString() ,
    to: NOW.toISOString(),
    metric: 'volume_usd_change_30d'
  }

  return <div className={styles.container}>
    <Query query={ALL_PROJECTS_AGGREGATED_QUERY} variables={variables}>
      {(props) => {
        const { data: { allProjects: data = [] } = {}, loading } = props

        console.log(props)

        if(loading){
          return <PageLoader/>
        }

        console.log(data)

        return <div>
          aggregatedTimeseriesData
        </div>
      }}
    </Query>
  </div>
}

// "volume_usd_change_30d"

export default VolumeChart
