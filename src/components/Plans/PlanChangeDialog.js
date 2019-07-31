import React, { useState } from 'react'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import PLANS from './list'
import { showNotification } from '../../actions/rootActions'
import { UPDATE_SUBSCRIPTION_MUTATION } from '../../queries/plans'
import { formatPrice } from '../../utils/plans'
import { getDateFormats } from '../../utils/dates'
import { formatError, contactAction } from '../../utils/notifications'
import planStyles from './Plans.module.scss'
import dialogStyles from './Dialog.module.scss'

const ChangePlanDialog = ({
  subscription: {
    id,
    currentPeriodEnd,
    plan: { amount, name, interval } = {}
  } = {},
  title,
  price,
  billing,
  planId,
  addNot
}) => {
  const [dialogVisible, setDialogVisiblity] = useState(false)

  const [oldPrice] = formatPrice(amount)
  const { MMMM, DD, YYYY } = getDateFormats(new Date(currentPeriodEnd))
  const date = `${MMMM} ${DD}, ${YYYY}`

  function hideDialog () {
    setDialogVisiblity(false)
  }

  function showDialog () {
    setDialogVisiblity(true)
  }

  return (
    <Mutation mutation={UPDATE_SUBSCRIPTION_MUTATION}>
      {(updateSubscription, { loading }) => (
        <Dialog
          open={dialogVisible}
          onClose={hideDialog}
          trigger={
            <Button
              onClick={showDialog}
              fluid
              className={planStyles.link}
              border
              accent='positive'
            >
              Change to this plan
            </Button>
          }
          title='Plan change'
        >
          <Dialog.ScrollContent withPadding>
            Your current plan ({PLANS[name].title} {oldPrice}/{interval}) is
            active until {date}.
            <br />
            Are you sure you want to change to the {title} plan ({price}/
            {billing}) on {date}?
          </Dialog.ScrollContent>
          <Dialog.Actions>
            <Dialog.Cancel className={dialogStyles.cancel} onClick={hideDialog}>
              Cancel
            </Dialog.Cancel>
            <Dialog.Approve
              accent='positive'
              isLoading={loading}
              onClick={() =>
                updateSubscription({
                  variables: { subscriptionId: +id, planId: +planId }
                })
                  .then(() =>
                    addNot({
                      variant: 'success',
                      title: `You have successfully upgraded to the "${title}" plan!`
                    })
                  )
                  .then(hideDialog)
                  .catch(e =>
                    addNot({
                      variant: 'error',
                      title: `Error during the plan change`,
                      description: formatError(e.message),
                      actions: contactAction
                    })
                  )
              }
            >
              Confirm change
            </Dialog.Approve>
          </Dialog.Actions>
        </Dialog>
      )}
    </Mutation>
  )
}

const mapDispatchToProps = dispatch => ({
  addNot: message => dispatch(showNotification(message))
})

export default connect(
  null,
  mapDispatchToProps
)(ChangePlanDialog)
