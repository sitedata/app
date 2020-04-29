import React, { useState} from 'react'
import {connect} from "react-redux";
import {Query} from "react-apollo";
import {ALL_PROJECTS_AGGREGATED_QUERY} from "../../Projects/allProjectsGQL";
import {addDays} from "../../../utils/dates";
import PageLoader from "../../../components/Loader/PageLoader";
import ChartProvider from "./ChartProvider";
import styles from './VolumeChart.module.scss'

const NOW = new Date()

const VolumeChart = ({isNightModeEnabled}) => {
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

        if(loading){
          return <PageLoader/>
        }

        const mapped = data.map(item => {
          return {
            ...item,
            index: item.slug
          }
        })

        return <ChartProvider
          data={mapped}
          className={styles.chart}
        />
      }}
    </Query>
  </div>
}

const mapStateToProps = ({
                           rootUi: { isNightModeEnabled,  }
                         }) => ({
  isNightModeEnabled,
})

export default connect(mapStateToProps)(VolumeChart)
