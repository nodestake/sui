// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import cl from 'classnames';
import { useMemo, useEffect } from 'react';
import { Navigate, useSearchParams, Link } from 'react-router-dom';

import BottomMenuLayout, {
    Content,
    Menu,
} from '_app/shared/bottom-menu-layout';
import Icon, { SuiIcons } from '_components/icon';
import ReceiptCard from '_components/receipt-card';
import { useAppSelector, useAppDispatch } from '_hooks';
import { getTransactionsByAddress } from '_redux/slices/txresults';

import type { TxResultState } from '_redux/slices/txresults';

import st from './ReceiptPage.module.scss';

// Response pages for all transactions
// use txDigest for the transaction result
function ReceiptPage() {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    // get tx results from url params
    const txDigest = searchParams.get('txdigest');

    const tranferType = searchParams.get('transfer') as 'nft' | 'coin';

    const txResults: TxResultState[] = useAppSelector(
        ({ txresults }) => txresults.latestTx
    );

    useEffect(() => {
        dispatch(getTransactionsByAddress()).unwrap();
    }, [dispatch]);

    const txnItem = useMemo(() => {
        return txResults.filter((txn) => txn.txId === txDigest)[0];
    }, [txResults, txDigest]);

    //TODO: redo the CTA links
    const ctaLinks = tranferType === 'nft' ? '/nfts' : '/';
    const linkTo = tranferType ? ctaLinks : '/transactions';

    if (!txDigest && txResults && !txnItem) {
        return <Navigate to={linkTo} replace={true} />;
    }

    return (
        <div className={st.container}>
            <BottomMenuLayout>
                <Content>
                    {txnItem && (
                        <ReceiptCard
                            txDigest={txnItem}
                            tranferType={tranferType}
                        />
                    )}
                </Content>
                <Menu stuckClass={st.shadow} className={st.shadow}>
                    <Link
                        to={linkTo}
                        className={cl('btn', st.action, st.done, 'neutral')}
                    >
                        <Icon
                            icon={SuiIcons.Checkmark}
                            className={st.checkmark}
                        />
                        Done
                    </Link>
                </Menu>
            </BottomMenuLayout>
        </div>
    );
}

export default ReceiptPage;
