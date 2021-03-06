import React, { useState } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import { useUpdateTemplate } from '../../gql/hooks'
import {
  getTemplateAssets,
  getTemplateMetrics,
  prepareTemplateLink
} from '../../utils'
import TemplateDetailsDialog, {
  TemplateInfoTrigger
} from '../../TemplateDetailsDialog/TemplateDetailsDialog'
import TemplateStatus from '../../TemplateStatus/TemplateStatus'
import styles from './Template.module.scss'
import { updateHistory } from '../../../../../utils/utils'

export const isUserAuthorOfTemplate = (template, user) => {
  const { user: { id } = {} } = template
  return user && user.data && +user.data.id === +id
}

export const usePublicTemplates = template => {
  const [updateTemplate] = useUpdateTemplate()
  const [isPublic, setIsPublic] = useState(template.isPublic)
  function toggleIsPublic (e) {
    e.stopPropagation()

    setIsPublic(state => {
      const newState = !state
      updateTemplate(template, { isPublic: newState })
      return newState
    })
  }

  return { isPublic, toggleIsPublic }
}

const Template = ({
  template,
  selectTemplate,
  isAuthor,
  asLink = false,
  className,
  redirect,
  onOpenTemplate,
  onRename = () => {}
}) => {
  const { title } = template
  const { isPublic, toggleIsPublic } = usePublicTemplates(template)

  function onTemplateClick () {
    selectTemplate && selectTemplate(template)

    if (asLink) {
      const link = prepareTemplateLink(template)

      updateHistory(link)
      redirect(link)
    }
  }

  const usedAssets = getTemplateAssets(template)
  const usedMetrics = getTemplateMetrics(template)

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.left} onClick={onTemplateClick}>
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <TemplateStatus
            isAuthor={isAuthor}
            isPublic={isPublic}
            toggleIsPublic={toggleIsPublic}
            classes={styles}
          />
          <span>
            · {usedAssets.length} asset(s) · {usedMetrics.length} metric(s)
          </span>
        </div>
      </div>

      {onOpenTemplate ? (
        <TemplateInfoTrigger
          classes={styles}
          onClick={e => {
            e.stopPropagation()

            onOpenTemplate(template)
          }}
        />
      ) : (
        <TemplateDetailsDialog
          template={template}
          onRename={onRename}
          selectTemplate={selectTemplate}
        />
      )}
    </div>
  )
}

const mapStateToProps = ({ user }, { template }) => ({
  isAuthor: isUserAuthorOfTemplate(user, template)
})

const mapDispatchToProps = dispatch => ({
  redirect: route => {
    dispatch(push(route))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Template)
