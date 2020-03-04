import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import { PATHS } from '../../App'
import styles from './FreeTrialBlock.module.scss'

const FreeTrialBlock = () => {
  return (
    <div className={styles.container}>
      <svg
        width='198'
        height='104'
        viewBox='0 0 198 104'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M27.2137 35.7365C26.8924 33.4142 26.5176 31.092 25.8216 28.8777C25.6074 28.1756 25.072 27.8516 24.5365 27.8516C24.0546 26.5554 21.9665 26.1774 21.5917 27.9056C21.2704 29.2557 21.2169 30.6059 21.3239 31.9561C19.9318 31.47 18.4326 31.146 17.3617 31.524C16.5586 31.794 16.0767 32.4421 15.7019 33.0902C15.4342 32.6582 15.1129 32.2801 14.6846 31.9561C14.4168 31.74 13.9885 31.9021 14.0956 32.2801C14.2027 32.5501 14.2562 32.8202 14.3633 33.0902C14.3098 33.0362 14.3098 32.9822 14.2562 32.9282C13.6672 32.0101 13.0247 31.092 12.2751 30.2279C12.0609 30.0118 11.7932 30.2279 11.8468 30.4979C12.0609 31.632 12.4357 32.7122 12.8105 33.7923C13.1318 34.8184 13.4531 35.8985 13.9885 36.8707C14.5775 37.8428 16.2373 37.3567 16.1302 36.3306C16.505 36.1686 16.7728 36.0065 17.094 35.7365C17.4153 35.4125 17.5759 34.7104 17.9507 34.4404C18.8609 33.7923 22.02 35.4665 22.9838 35.8445C23.5192 36.0605 24.0011 35.8985 24.3759 35.5745C24.4295 35.8445 24.483 36.1146 24.483 36.3306C22.5554 36.3306 20.6814 34.8724 18.7539 35.6825C17.4153 36.2226 16.7192 37.8428 15.5948 38.7609C15.1129 39.1389 15.6483 39.787 16.1302 39.733C17.8972 39.463 18.5932 37.4647 20.6279 38.1128C22.2342 38.5989 24.4295 39.787 26.1428 39.0309C27.3743 38.3288 27.3743 36.9247 27.2137 35.7365Z'
          fill='var(--porcelain)'
        />
        <path
          d='M18.3564 29.4331C18.1985 30.467 15.9208 30.3278 14.8018 30.129C15.8549 30.7586 17.7046 32.4353 16.6777 34.1054C15.6508 35.7755 17.1055 35.928 17.9613 35.7954C18.3562 35.0995 19.4818 33.7873 20.8247 34.1054C22.5032 34.5031 22.8982 35.7954 24.6754 35.7954C26.4527 35.7954 23.5893 32.4155 22.8982 32.0178C22.207 31.6202 23.5893 29.4331 24.6754 28.439C25.7616 27.4449 24.2805 27.6438 22.8982 27.7432C21.5158 27.8426 20.5285 25.5561 20.1335 24.4626C19.7386 23.3691 18.9486 24.1644 18.3564 24.4626C17.7641 24.7608 18.5537 28.1408 18.3564 29.4331Z'
          fill='var(--jungle-green)'
        />
        <path
          d='M15.2937 34.8994L15.2937 34.8993M15.2937 34.8994C15.3319 35.2216 15.3696 35.5403 15.4024 35.8539C15.4366 36.1991 15.4763 36.5498 15.5162 36.9026C15.6012 37.6535 15.6872 38.4134 15.7236 39.1483M15.2937 34.8994L15.3922 34.8877L15.3922 34.8877L16.2868 34.7818M15.2937 34.8994L16.287 34.7832L16.2868 34.7818M15.2937 34.8993L15.7236 39.1483M15.2937 34.8993C15.2071 34.1674 15.1183 33.4175 15.0811 32.6675C14.9472 32.6135 14.8 32.5595 14.6528 32.5055C14.5055 32.4515 14.3583 32.3975 14.2244 32.3435M15.2937 34.8993L14.2244 32.3435M15.7236 39.1483L16.5268 39.1085L16.549 39.1074M15.7236 39.1483L16.4848 39.0225M16.549 39.1074L16.5598 39.1152L16.8454 39.3221L17.2764 39.6343L16.9967 39.1722L16.9334 39.0676M16.549 39.1074L16.5626 39.1067L16.7224 39.0988C16.7199 39.048 16.7171 38.9971 16.7142 38.9461C16.7234 38.9495 16.7328 38.9532 16.7426 38.9572C16.7926 38.9778 16.8609 39.012 16.9334 39.0676M16.549 39.1074L16.5268 39.0912L16.4666 39.0476C16.4726 39.0393 16.4787 39.0309 16.4848 39.0225M16.9334 39.0676C16.9628 39.0901 16.9929 39.1162 17.0227 39.1463C16.9941 39.1174 16.9638 39.0904 16.932 39.0653M16.9334 39.0676L16.932 39.0653M16.932 39.0653L16.7586 38.7788C16.7396 38.7903 16.722 38.8008 16.7058 38.8103M16.932 39.0653C16.8651 39.0125 16.7916 38.9684 16.7135 38.9342C16.7111 38.893 16.7085 38.8517 16.7058 38.8103M16.7058 38.8103C16.704 38.7825 16.7022 38.7546 16.7003 38.7267C16.6646 38.7755 16.629 38.8242 16.5935 38.8729M16.7058 38.8103C16.6577 38.8387 16.6216 38.8586 16.5935 38.8729M16.5935 38.8729C16.5692 38.8853 16.551 38.8934 16.5364 38.8992C16.5294 38.9019 16.5247 38.9035 16.522 38.9044M16.5935 38.8729C16.5848 38.8848 16.5761 38.8968 16.5674 38.9087M16.522 38.9044C16.5207 38.9044 16.5196 38.9043 16.5187 38.9043C16.5196 38.9044 16.5206 38.9044 16.5217 38.9045M16.522 38.9044C16.5234 38.9044 16.525 38.9044 16.5268 38.9044C16.5254 38.9044 16.5242 38.9044 16.5232 38.9045M16.522 38.9044C16.5219 38.9044 16.5218 38.9044 16.5217 38.9045M16.5217 38.9045C16.5209 38.9047 16.5203 38.9049 16.5199 38.905C16.5207 38.9048 16.5218 38.9047 16.5232 38.9045M16.5217 38.9045C16.5222 38.9045 16.5227 38.9045 16.5232 38.9045M16.5232 38.9045C16.5243 38.9046 16.5255 38.9047 16.5268 38.9047C16.5362 38.9053 16.5505 38.9065 16.5674 38.9087M16.5674 38.9087C16.5538 38.9274 16.5403 38.946 16.5268 38.9647C16.5127 38.984 16.4987 39.0032 16.4848 39.0225M16.5674 38.9087C16.5732 38.9095 16.5792 38.9104 16.5855 38.9115C16.5958 38.9132 16.6093 38.9157 16.6256 38.9195C16.6415 38.9232 16.6601 38.9281 16.6807 38.9347C16.6834 38.9374 16.6861 38.9403 16.6886 38.9434C16.7047 38.9629 16.7093 38.9794 16.7102 38.9853L16.5972 39.0039L16.5268 39.0156L16.4848 39.0225M16.2868 34.7818L16.2868 34.7817C16.1995 34.0442 16.1151 33.3281 16.0799 32.618C16.0606 32.2287 15.8168 31.886 15.4552 31.7402C15.3064 31.6801 15.1466 31.6215 15.0046 31.5694L14.9971 31.5667C14.8464 31.5114 14.7148 31.463 14.5986 31.4161C14.5887 31.4121 14.5787 31.4083 14.5687 31.4046L14.5613 31.4019C13.593 31.0468 12.6094 30.686 11.6221 30.3548M16.2868 34.7818L26.1063 36.4944M11.6221 30.3548C13.3845 29.9154 15.0936 29.3176 16.7705 28.6894C17.1274 28.5557 17.3772 28.2308 17.4148 27.8516L17.5754 26.2314L17.5754 26.2314L17.5758 26.2279L17.6146 25.8213M11.6221 30.3548C11.4911 30.3874 11.3598 30.4192 11.2282 30.4501L10.9833 31.1961L11.2282 30.4501C11.2269 30.4504 11.2257 30.4507 11.2245 30.451C11.2244 30.451 11.2244 30.451 11.2243 30.451C11.1373 30.4714 11.0501 30.4914 10.9628 30.5109C10.9376 30.5166 10.9122 30.5213 10.8867 30.5249C10.914 30.521 10.9388 30.5134 10.961 30.503C11.0535 30.4596 11.1016 30.3678 11.1016 30.2912C11.1016 30.2914 11.1009 30.261 11.0716 30.2196C11.0573 30.1994 11.0389 30.1808 11.0178 30.1659C11.0098 30.1602 11.0022 30.1557 10.9952 30.152C10.9838 30.146 10.9741 30.1424 10.9675 30.1404C10.9771 30.1432 10.9866 30.1461 10.9961 30.1492C11.0948 30.1808 11.1934 30.2129 11.2919 30.2452L11.292 30.2452L11.2951 30.2462C11.2951 30.2462 11.2951 30.2462 11.2952 30.2463C11.4042 30.282 11.5132 30.3182 11.6221 30.3548ZM17.6146 25.8213C17.6147 25.821 17.6147 25.8206 17.6147 25.8203C17.7496 24.4074 17.8877 22.9631 18.0911 21.587M17.6146 25.8213C17.6124 25.8442 17.6094 25.867 17.6057 25.8896L17.6057 25.8897L16.6193 25.7253M17.6146 25.8213L17.6147 25.8204L16.6194 25.7253L16.6193 25.7253M18.0911 21.587C18.3038 21.884 18.5175 22.1878 18.7341 22.4957L18.7364 22.4989C19.0293 22.9153 19.3275 23.3391 19.6266 23.7505C19.7494 23.9193 19.8743 24.0903 19.9998 24.262L20.001 24.2637L20.8087 23.6742M18.0911 21.587C18.1122 21.4439 18.1341 21.3016 18.1567 21.16L18.0769 21.1473L18.6685 20.6781M18.0911 21.587C18.0138 21.4791 17.9367 21.3721 17.8597 21.2662L17.9536 21.1978L18.0277 21.144L17.9422 21.1299L17.1693 21.0021M20.8087 23.6742L20.0013 24.2641L20.0015 24.2644L20.0018 24.2648C20.4838 24.9245 20.974 25.5955 21.4296 26.2639C21.5959 26.508 21.8617 26.666 22.1555 26.6957C23.1961 26.8006 24.2432 26.9587 25.2577 27.1203L25.2577 27.1203L25.2616 27.1209L26.9773 27.3872M20.8087 23.6742L20.8093 23.6749C21.2896 24.3323 21.7895 25.0165 22.2559 25.7007C23.3268 25.8087 24.3976 25.9707 25.415 26.1328M20.8087 23.6742L20.8082 23.6734C20.6823 23.5011 20.5577 23.3306 20.4354 23.1624C20.1409 22.7574 19.8464 22.3388 19.552 21.9203C19.2575 21.5017 18.963 21.0832 18.6685 20.6781M26.9773 27.3872L26.5005 27.8311C25.8222 28.4626 25.1022 29.0843 24.3384 29.6493C23.9911 29.9061 23.848 30.3569 23.9836 30.767C24.4 32.0272 24.8786 33.2834 25.3389 34.4912L25.3426 34.5012L25.3375 34.4873L25.3374 34.4871L26.2772 34.1454M26.9773 27.3872L27.1596 27.2174M26.9773 27.3872L27.3498 27.445L27.3627 27.3616L27.3712 27.3068L27.3738 27.2902L27.3916 27.1755L27.5031 26.4568M26.2772 34.1454L26.267 34.1493L25.3427 34.5014L25.3428 34.5016C25.4854 34.8759 25.6262 35.2455 25.764 35.6118L25.7639 35.6118L25.7677 35.6215L26.1063 36.4944M26.2772 34.1454C25.8144 32.9308 25.3424 31.692 24.9331 30.4533M26.2772 34.1454L26.2773 34.1455C26.4197 34.5195 26.5613 34.8912 26.7 35.2598L27.1819 36.502L24.9331 30.4533M26.1063 36.4944C26.2444 36.5406 26.3818 36.5852 26.5187 36.6284C26.5436 36.6362 26.5681 36.645 26.5923 36.6547C26.5659 36.6441 26.5409 36.6369 26.5175 36.6321C26.4451 36.6175 26.3894 36.6271 26.3628 36.6347C26.3301 36.6442 26.3171 36.656 26.3111 36.662L26.44 36.7898L26.4446 36.7944L26.4612 36.8108L26.5098 36.8591L27.0212 37.3661L26.4788 36.9359L26.4332 36.8997L26.3485 36.8325L26.3424 36.8277L26.2401 36.7466M26.1063 36.4944L26.2496 36.8637L26.2496 36.8637L26.2523 36.8706C26.2514 36.8683 26.2505 36.8659 26.2497 36.8636C26.2333 36.8186 26.2337 36.7799 26.2379 36.7566C26.2386 36.7527 26.2394 36.7493 26.2401 36.7466M26.2401 36.7466C26.244 36.7324 26.2471 36.7328 26.2378 36.7447L26.2401 36.7466ZM24.9331 30.4533C25.7362 29.8592 26.4858 29.2111 27.1819 28.563L27.8779 27.915C28.1457 27.6989 28.2527 27.3749 28.1457 27.0509C28.0921 26.7268 27.8244 26.5108 27.5031 26.4568M24.9331 30.4533L27.1596 27.2174M14.2244 32.3435C13.144 31.9472 12.0636 31.551 10.9832 31.1964L10.9801 31.1953M14.2244 32.3435L10.9801 31.1953M10.9801 31.1953C10.8836 31.1637 10.787 31.1323 10.6905 31.1013C10.3157 30.9933 10.1016 30.6693 10.1016 30.2912C10.1016 29.9132 10.3693 29.5892 10.7441 29.5352C12.6716 29.1031 14.5457 28.455 16.4197 27.7529L16.5803 26.1328L16.6193 25.7253M10.9801 31.1953L25.415 26.1328M25.415 26.1328L27.5031 26.4568M25.415 26.1328L27.1867 27.3008M18.6685 20.6781C18.4543 20.4081 18.1331 20.3001 17.8118 20.3541C17.4905 20.4081 17.2228 20.6781 17.1693 21.0021M18.6685 20.6781L18.0329 21.1402L17.9415 21.1256L17.1693 21.0021M17.1693 21.0021C16.9232 22.5412 16.7676 24.1715 16.6193 25.7252L16.6193 25.7253M27.1596 27.2174C27.1594 27.2163 27.1592 27.2151 27.159 27.2139C27.1592 27.2151 27.1594 27.2162 27.1596 27.2174L27.1644 27.213L27.1965 27.1831C27.2138 27.167 27.2316 27.1515 27.25 27.1367C27.2444 27.1412 27.2249 27.1598 27.2087 27.1961C27.2072 27.1994 27.2058 27.2028 27.2044 27.2064C27.2024 27.2115 27.2005 27.2169 27.1987 27.2226C27.19 27.2502 27.1866 27.2769 27.1867 27.3008M27.1596 27.2174L27.1867 27.3008M27.5031 26.4568L27.3821 27.177L27.3649 27.2792L27.3596 27.3106L27.3528 27.351L27.3374 27.443C27.3313 27.4419 27.3004 27.4355 27.26 27.3996C27.2463 27.3874 27.233 27.3729 27.2206 27.3566C27.208 27.3398 27.1965 27.3211 27.1867 27.3008M17.9607 21.2395L18.0719 21.1513L18.1559 21.1652C18.1464 21.2226 18.1216 21.2594 18.1003 21.2809C18.079 21.3024 18.0402 21.3297 17.9776 21.3402C17.9764 21.3404 17.9606 21.3424 17.936 21.3334C17.9241 21.3291 17.9128 21.323 17.9029 21.3159C17.893 21.3087 17.8873 21.3024 17.885 21.2995L17.9607 21.2395Z'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M3.91504 56.2166C4.04294 58.1338 4.45224 62.1985 5.06618 63.1188'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M1 59.9424C2.92246 59.981 5.83321 59.9421 7.3681 59.6677'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M190.139 58.5198C189.259 60.2283 187.511 63.9217 187.562 65.0269'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M185.719 60.2063C187.345 61.2309 189.859 62.6988 191.315 63.2556'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M86.4842 32.1407C84.6738 28.4966 81.87 25.8523 79.0961 23.2362C75.4794 19.8253 71.9136 16.4624 70.6667 10.994C70.0371 8.14276 66.8106 7.98436 65.0793 9.48918C62.325 8.53877 58.3116 9.25159 56.7377 12.182C55.1741 15.1149 57.4621 17.9185 59.3113 20.1845C59.5095 20.4274 59.7027 20.6641 59.8855 20.8942C64.135 26.2006 70.1945 30.4775 76.254 33.9624C75.0613 34.0547 73.8419 34.2816 72.6581 34.5018C71.811 34.6595 70.9822 34.8137 70.1945 34.9128C67.5976 35.2296 65.7089 35.7048 63.5842 37.2888C63.1907 37.6056 63.2694 38.3184 63.8989 38.3184C65.3863 38.3683 67.1079 38.7247 68.8989 39.0955C72.7937 39.9018 77.0169 40.776 79.8739 38.7144C80.6609 38.16 81.0543 37.368 81.0543 36.576C81.1724 36.6156 81.2707 36.675 81.3691 36.7344C81.4675 36.7938 81.5658 36.8532 81.6839 36.8928C84.9103 38.4768 87.9794 35.3088 86.4842 32.1407ZM63.6057 14.2522L63.607 14.2513C63.828 14.0998 64.0996 13.9136 64.3711 13.8453C64.4964 14.4131 64.6718 14.9306 64.8573 15.478L64.8576 15.4789L64.8584 15.4814C64.8856 15.5618 64.9131 15.6429 64.9407 15.7249C64.9606 15.7842 64.9807 15.8441 65.0007 15.9045C64.8604 15.7633 64.7201 15.6273 64.5824 15.4937C64.1795 15.1029 63.7988 14.7337 63.5055 14.3205L63.5442 14.2943L63.6057 14.2522Z'
          fill='var(--porcelain)'
        />
        <path
          d='M138.183 63.7985L138.184 63.816C138.335 68.5493 138.486 73.2801 138.737 77.9982C138.803 79.2599 138.94 80.659 139.084 82.1347L139.084 82.1357C139.809 89.5527 140.724 98.9044 133.701 102.471C130.553 103.976 126.776 102.155 126.697 98.4321C126.54 92.0168 126.304 85.6015 125.989 79.1862C125.888 77.0112 125.83 74.8216 125.772 72.6299C125.695 69.7139 125.618 66.7943 125.438 63.9004C123.894 63.9168 122.527 63.9365 121.266 63.9548H121.264C116.418 64.0248 113.112 64.0726 107.181 63.8212C107.039 65.5314 106.834 67.1774 106.622 68.8747L106.551 69.4445C105.922 74.8302 105.45 80.2159 105.371 85.6015C105.348 86.9695 105.384 88.3835 105.421 89.8151L105.421 89.8182C105.511 93.3585 105.605 97.0063 104.82 100.333C104.584 101.363 103.246 101.204 102.932 100.333C101.444 96.5234 101.177 91.8957 100.931 87.6545C100.891 86.958 100.851 86.2719 100.807 85.6015C100.492 80.4535 100.413 75.3846 100.571 70.2365L100.689 66.514C100.728 65.2666 100.767 64.0192 100.807 62.7916C99.3903 61.5244 99.3903 59.2275 100.807 57.9603C100.767 57.4456 100.748 56.9309 100.728 56.4162C100.708 55.9013 100.689 55.3864 100.649 54.8715C100.584 53.9813 100.467 53.0603 100.349 52.1276C99.8997 48.5793 99.4291 44.8631 101.672 42.0409C102.302 41.2489 103.955 41.0113 104.742 41.6449C108.203 44.313 108.011 49.0616 107.844 53.23C107.832 53.5162 107.821 53.7996 107.811 54.0795C107.771 54.5152 107.752 54.9708 107.732 55.4263C107.712 55.8816 107.693 56.3368 107.653 56.7723C113.868 56.4249 117.81 56.3738 122.772 56.3095L122.774 56.3095H122.775C124.599 56.2859 126.56 56.2605 128.822 56.2179H129.058C128.822 51.6242 128.665 47.1098 128.586 42.5161C128.532 38.6434 132.396 37.513 134.962 38.9694C136.372 37.9239 139.518 37.2537 142.327 36.6555C144.079 36.2824 145.7 35.9372 146.686 35.5464C149.049 34.5821 151.464 33.8265 153.89 33.0678C154.452 32.8918 155.015 32.7157 155.578 32.5367C156.444 32.2991 156.759 33.4871 156.129 33.8832C153.532 35.8632 151.014 37.6848 148.181 39.1896C145.96 40.4156 140.28 41.8385 137.143 42.3225C137.151 42.3863 137.158 42.4508 137.164 42.5161C137.73 49.5931 137.957 56.6987 138.183 63.7985Z'
          fill='var(--porcelain)'
        />
        <path
          d='M82.952 56.3513C83.9772 56.5965 84.919 56.9824 85.6974 57.5643C87.9795 59.2275 87.6647 62.3956 84.9104 63.4252C82.549 64.3008 79.5988 63.7441 76.9122 63.2372L76.9113 63.237L76.9078 63.2364C76.1937 63.1017 75.4983 62.9705 74.8375 62.8708L74.6805 62.8483L74.5009 62.8229L74.1329 62.7714C71.5578 62.4118 68.7363 62.0177 66.5746 60.4947C66.4652 60.4287 66.3802 60.3382 66.3211 60.2351C66.0886 60.1756 65.8582 60.1044 65.6305 60.0195C64.2927 59.5443 63.5845 57.8019 64.7649 56.6931C68.1549 53.5087 74.5019 53.5179 79.0419 53.5245C79.2444 53.5248 79.4433 53.5251 79.6381 53.5251C81.573 53.5251 82.6605 54.8454 82.952 56.3513Z'
          fill='var(--porcelain)'
        />
        <path
          d='M133.159 21.6117C134.414 22.1684 135.643 22.8963 137.006 23.7454C140.233 25.8046 143.38 21.2902 140.941 18.6765C134.803 11.8652 124.336 14.2413 116.703 16.6173C110.88 18.4389 99.3114 22.0822 98.0523 29.2103C97.9736 29.5271 98.2884 29.9231 98.6819 29.8439C99.9425 29.4474 101.124 28.7929 102.286 28.089C100.427 29.7482 98.993 31.6944 98.6035 33.8831C98.5248 34.5167 98.8396 35.1504 99.5478 35.1504C102.477 35.1504 105.6 33.6176 108.606 32.1426L108.606 32.1422C110.284 31.3186 111.926 30.513 113.477 30.0023C118.907 28.1014 124.258 27.151 130.003 27.3886C133.346 27.4972 134.399 23.9228 133.159 21.6117Z'
          fill='var(--porcelain)'
        />
        <path
          d='M139.839 26.9135C139.052 26.2006 137.793 25.6462 136.77 26.1214C134.67 26.9484 132.113 27.5756 129.434 28.2328C122.875 29.8414 115.582 31.6303 112.453 36.972C112.139 37.5264 112.532 38.4768 113.24 38.3976C115.549 38.1698 117.833 37.5487 120.12 36.9265C121.807 36.4673 123.498 36.0075 125.202 35.7048C129.687 34.9128 134.094 33.9624 138.423 32.2991C139.76 31.8239 140.783 30.7151 140.783 29.2103C140.705 28.1807 140.547 27.6263 139.839 26.9135Z'
          fill='var(--porcelain)'
        />
        <path
          d='M97.8666 40.7452C97.7074 38.9804 92.0902 40.0098 89.3015 40.7452C90.0319 47.4298 91.0544 61.481 89.3015 64.2083C87.1103 67.6175 91.0943 74.837 91.4927 79.4494C91.891 84.0618 91.0942 95.292 89.3015 99.9045C87.5087 104.517 97.8666 101.509 99.0615 99.9045C100.256 98.3001 98.0656 42.9511 97.8666 40.7452Z'
          fill='var(--jungle-green)'
        />
        <path
          d='M150.12 18.5L145.704 20.5519C144.006 22.6608 139.419 26.4201 138.197 28.472C136.668 31.0369 129.909 33.2053 127.362 33.2053C124.814 33.2052 110.039 35.2571 107.661 37.309C105.283 39.3609 112.586 38.335 114.285 38.335C115.983 38.335 130.249 37.993 135.514 38.335C140.779 38.677 139.42 36.6251 146.723 35.2571C154.026 33.8892 151.988 33.2053 153.007 30.9824C154.026 28.7595 145.704 29.7854 145.704 29.4434C145.704 29.1699 148.648 22.0338 150.12 18.5Z'
          fill='var(--jungle-green)'
        />
        <path
          d='M58.5518 57.2434H88.5613'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M100.189 56.8257H127.698'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M58.6419 102.655C58.1157 88.1969 57.9738 58.2816 58.1354 43.8188'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M58.6416 102.71H126.865C127.149 87.8309 126.865 72.719 126.865 57.6668C126.865 55.8449 128.702 56.9342 128.702 55.0308C128.623 54.1596 127.915 43.9784 127.915 39.6223'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M139.784 39.2026C138.951 58.0864 139.562 77.9946 140.633 98.7208'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M127.28 56.8283C130.536 56.4184 134.852 57.0987 138.117 57.2482'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M88.252 39.9016C88.8347 59.8411 89.1745 82.6224 89.769 102.566'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M100.19 102.568C99.6711 81.4253 99.2313 59.9305 98.9395 38.7832'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M48.9229 50.5331C55.6906 42.2962 68.6902 38.7832 84.3504 38.7832H139.444'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M49.0616 50.533C49.0616 48.1777 49.0616 45.2705 49.0616 42.9131C47.2608 42.9131 40.5912 43.3878 40.2478 40.8538C39.2542 35.3537 59.1789 28.8293 63.5098 27.4529'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M83.2492 38.5934C83.0132 36.851 79.674 35.2294 75.5032 33.487C66.6107 29.6853 54.4131 24.5373 54.4131 11.9443C54.4131 6.39565 59.4522 0.67372 67.319 1.01451C75.1857 1.3553 83.0579 4.49936 89.0386 10.5979C95.6355 17.4032 100.387 28.8888 99.0091 38.5934'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M55.2783 9.49147C58.0326 7.90745 61.5739 6.95703 64.643 6.95703C74.4798 6.95703 89.5104 20.4212 89.5104 32.0638C89.5104 34.0439 89.1169 36.1823 88.2513 38.5583'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M88.5179 30.808C81.9076 30.1744 68.9283 22.4153 69.7619 8.98682'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M96.0215 19.0711C104.284 10.2006 114.851 6.79492 128.072 6.79492C144.204 6.79492 145.463 16.2199 145.463 19.0711C145.463 27.0704 132.951 30.1593 120.911 33.0897C113.907 34.8321 107.102 36.2598 104.505 38.7151'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M98.9395 30.8079C101.222 27.1647 114.773 17.1707 127.6 17.1707C131.928 17.1707 137.813 19.5217 137.813 27.0725'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M151.455 17.3796C148.884 20.8094 148.496 26.5531 145.463 29.6054C147.588 29.447 151.286 29.2094 156.165 30.635C156.964 30.7957 157.305 32.111 156.638 32.615C156.244 32.9318 154.834 34.6532 135.317 38.7717'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M145.619 19.9006C147.744 19.1878 149.003 18.6787 151.521 17.4907'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M140.645 98.5337C140.307 103.846 130.895 102.72 125.743 102.72'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M197.041 30.3608C195.886 28.695 193.752 28.0643 191.941 29.0501C190.218 29.9571 188.715 31.3815 187.222 32.6384C185.729 33.8952 184.584 34.9204 183.81 36.7242C183.233 38.0352 184.481 39.5383 185.729 39.6121C187.727 39.7303 189.269 39.0649 191.065 38.3304C192.949 37.5171 194.741 36.8664 196.395 35.7032C198.05 34.54 198.123 31.854 197.041 30.3608Z'
          fill='var(--porcelain)'
        />
        <path
          d='M186.175 36.6296C186.147 36.675 186.123 36.7225 186.102 36.7716L186.007 36.766C185.96 36.7385 185.898 36.6729 185.884 36.5346C185.707 33.6466 185.007 31.8714 183.909 30.787C182.863 29.7543 181.594 29.5066 180.726 29.337C180.692 29.3304 180.659 29.3239 180.626 29.3175C180.155 29.2083 179.574 28.9953 179.122 28.6942C178.658 28.3854 178.487 28.0973 178.464 27.8656C178.463 27.8132 178.484 27.7383 178.543 27.6687C178.602 27.5987 178.663 27.5776 178.696 27.5744C183.685 27.3045 186.958 23.7165 188.403 21.5078C188.498 21.3618 188.554 21.1933 188.564 21.0192C188.601 20.4052 188.723 19.6867 188.954 19.1669C189.196 18.6237 189.383 18.6219 189.458 18.6262C189.615 18.6354 189.689 18.666 189.713 18.6788C189.73 18.6878 189.733 18.6922 189.736 18.6966C189.736 18.6969 189.736 18.6973 189.737 18.6976C189.756 18.7278 189.813 18.8629 189.787 19.1892C189.734 19.8388 189.401 20.662 189.147 21.1455C189.072 21.2886 189.033 21.4478 189.033 21.6094C189.03 24.834 191.003 27.9443 194.049 29.0192C194.098 29.0423 194.161 29.0908 194.209 29.1598C194.252 29.2203 194.256 29.257 194.257 29.2596C194.25 29.3605 194.218 29.4237 194.19 29.4586C194.165 29.49 194.125 29.5225 194.047 29.5401L194.027 29.5447C190.283 30.4689 187.916 33.8111 186.175 36.6296Z'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M174.537 48.4968C171.37 45.5351 167.023 48.4727 164.782 51.1145C163.974 52.0756 163.25 53.0416 162.599 54.1801C161.855 55.4813 161.86 56.8267 161.855 58.3397C161.884 59.2663 162.663 60.2371 163.764 59.966C164.954 59.616 166.045 59.5124 167.161 58.9899C168.282 58.3837 169.403 57.7774 170.597 57.3436C171.963 56.8359 173.343 56.0768 174.406 55.0467C176.266 53.2231 176.353 50.2857 174.537 48.4968Z'
          fill='var(--porcelain)'
        />
        <path
          d='M164.424 56.2437C164.418 56.2205 164.411 56.1975 164.403 56.1748C164.403 56.1712 164.402 56.1671 164.402 56.1625C164.401 56.1357 164.402 56.1001 164.403 56.0515C164.405 56.0023 164.408 55.9501 164.412 55.8853C164.426 55.6575 164.446 55.4285 164.469 55.1882C164.471 55.1634 164.474 55.1384 164.476 55.1132C164.496 54.9002 164.517 54.676 164.533 54.4556C164.567 53.9673 164.579 53.4203 164.473 52.8795C164.363 52.319 164.125 51.7641 163.671 51.2732C163.23 50.7964 162.634 50.4338 161.887 50.1613C161.841 50.1401 161.783 50.0954 161.738 50.0283C161.692 49.9601 161.677 49.8946 161.68 49.8413C161.686 49.737 161.719 49.6722 161.748 49.6367C161.773 49.6052 161.813 49.5728 161.891 49.5552C161.901 49.553 161.91 49.5506 161.92 49.5482C164.211 48.959 165.664 46.9234 166.669 45.3161C166.676 45.305 166.683 45.2938 166.689 45.2825C166.706 45.2529 166.742 45.2158 166.806 45.1894C166.874 45.1613 166.937 45.1613 166.969 45.1686C167.007 45.1774 167.11 45.2323 167.129 45.4126C167.213 47.0121 167.568 48.0982 168.248 48.7983C168.869 49.4376 169.645 49.6065 170.093 49.7039C170.134 49.7128 170.172 49.721 170.206 49.729C170.26 49.7413 170.315 49.7491 170.371 49.7524C170.985 49.7882 171.491 50.2281 171.579 50.654C171.575 50.7043 171.553 50.769 171.501 50.8297C171.443 50.898 171.384 50.9197 171.351 50.9237C168.97 51.0336 167.545 52.8798 166.594 54.2403C166.448 54.4498 166.313 54.6469 166.187 54.832C165.858 55.3143 165.585 55.715 165.301 56.0406C164.897 56.5022 164.73 56.4994 164.71 56.4983C164.663 56.4955 164.603 56.475 164.542 56.4221C164.477 56.3666 164.438 56.2973 164.424 56.2437Z'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M23.6014 87.1043C26.7688 84.1424 31.1152 87.0798 33.3569 89.7215C34.1645 90.6826 34.8888 91.6486 35.5398 92.7871C36.2837 94.0882 36.2786 95.4337 36.2834 96.9467C36.2539 97.8732 35.4755 98.8441 34.3741 98.573C33.1847 98.2231 32.0931 98.1195 30.9771 97.5971C29.8562 96.9909 28.7353 96.3846 27.5409 95.9509C26.1753 95.4432 24.7949 94.6842 23.7328 93.6542C21.8729 91.8306 21.7851 88.8932 23.6014 87.1043Z'
          fill='var(--porcelain)'
        />
        <path
          d='M34.0121 87.5046C34.2742 87.6682 34.446 87.9435 34.4778 88.2506C34.5096 88.5577 34.3978 88.8622 34.1748 89.0755C33.046 90.1556 32.1356 91.3565 31.5735 92.8398C31.4572 93.1466 31.1977 93.3768 30.8791 93.4556C30.5605 93.5344 30.2234 93.4518 29.9771 93.2346C28.6732 92.0846 27.4201 91.1451 25.8518 90.3967C25.5248 90.2406 25.3076 89.92 25.284 89.5585C25.2605 89.1971 25.4342 88.8513 25.7383 88.6546C26.813 87.9593 28.0244 86.7819 28.7161 84.8181C28.8311 84.4918 29.1066 84.2482 29.4446 84.1741C29.7825 84.1 30.1349 84.2059 30.3762 84.4542C31.5069 85.6172 32.7856 86.7392 34.0121 87.5046Z'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M46.2309 73.6533C44.4355 73.242 42.6882 72.5767 40.938 72.0032C40.5313 71.87 40.2902 71.4478 40.3794 71.0255C40.6777 69.6131 40.9125 68.172 40.8357 66.6867L40.8356 66.6857L37.0843 64.9736C36.7057 64.8009 36.5106 64.3731 36.6265 63.9702C36.9401 62.8804 37.1418 61.7819 37.2994 60.6866L37.3001 60.682C37.3662 60.24 37.4624 59.8032 37.5291 59.3614C35.8399 58.73 34.1641 58.061 32.4764 57.425C32.1445 57.2998 31.9269 56.9766 31.9338 56.6187C31.9701 54.7463 32.1057 53.0438 32.444 51.3521'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M176.051 89.2595C174.265 89.7094 172.406 89.9112 170.586 90.1961C170.164 90.2623 169.757 89.996 169.644 89.5793C169.267 88.1859 168.82 86.7958 168.075 85.508L168.075 85.5071L163.955 85.6878C163.539 85.706 163.17 85.4138 163.09 85.0022C162.873 83.8891 162.553 82.8192 162.195 81.7722L162.193 81.7677C162.051 81.3441 161.938 80.9113 161.796 80.4876C160.004 80.6931 158.207 80.8592 156.415 81.0599C156.062 81.0994 155.722 80.9104 155.565 80.5886C154.745 78.9046 154.091 77.3268 153.622 75.6665'
          stroke='var(--rhino)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>

      <div className={styles.start}>Start your free trial</div>
      <div className={styles.description}>
        Enjoy 14 days free of Sanbase Pro, no card or payment information
        required
      </div>
      <Button
        as={Link}
        to={PATHS.CREATE_ACCOUNT}
        className={styles.btn}
        variant={'fill'}
        accent={'positive'}
      >
        Start my Free Trial
      </Button>
    </div>
  )
}

export default FreeTrialBlock
