import { useTranslation } from "react-i18next";

export const useZakatForm = () => {
  const { t } = useTranslation();

  return [
    {
      name: "1",
      label: t("form.cashAndEquivalents"),
      children: [
        { name: "x1", label: t("form.cashOnHand"), children: [] },
        { name: "x2", label: t("form.cashInBank"), children: [] },
        { name: "x3", label: t("form.certifiedChecks"), children: [] },
        { name: "x4", label: t("form.foreignCurrency"), children: [] },
        { name: "x5", label: t("form.digitalAssets"), children: [] },
        { name: "x6", label: t("form.timeDeposits"), children: [] },
        { name: "x7", label: t("form.qardHasanGiven"), children: [] },
        { name: "x8", label: t("form.accruedIncome"), children: [] },
        { name: "x9", label: t("form.cashFromNonZakatAssets"), children: [] },
      ],
    },

    {
      name: "2",
      label: t("form.receivables"),
      children: [
        { name: "y1", label: t("form.currentReceivables"), children: [] },
        { name: "y2", label: t("form.deferredReceivables"), children: [] },
        { name: "y3", label: t("form.notesReceivable"), children: [] },
        { name: "y4", label: t("form.qardOrInstallments"), children: [] },
        { name: "y5", label: t("form.receivablesFromNonZakatAssets"), children: [] },
        { name: "y6", label: t("form.rentIncomeDue"), children: [] },
        { name: "y7", label: t("form.doubtfulDebts"), children: [] },
      ],
    },

    {
      name: "3",
      label: t("form.zakatInvestments"),
      children: [
        { name: "z1", label: t("form.sharesForTrade"), children: [] },
        { name: "z2", label: t("form.realEstateForTrade"), children: [] },
        { name: "z3", label: t("form.bondsOrTreasuryBills"), children: [] },
        { name: "z4", label: t("form.sharesForIncome"), children: [] },
      ],
    },

    {
      name: "4",
      label: t("form.tradeInventory"),
      children: [
        { name: "a1", label: t("form.finishedGoods"), children: [] },
        { name: "a2", label: t("form.workInProgress"), children: [] },
        { name: "a3", label: t("form.rawMaterials"), children: [] },
        { name: "a4", label: t("form.goodsInTransit"), children: [] },
        { name: "a5", label: t("form.goodsOnConsignment"), children: [] },
        { name: "a6", label: t("form.sparePartsForTrade"), children: [] },
        { name: "a7", label: t("form.giftedOrInheritedGoods"), children: [] },
        { name: "a8", label: t("form.realEstateHeldForTrade"), children: [] },
        { name: "a9", label: t("form.unsellableInventory"), children: [] },
      ],
    },

    {
      name: "6",
      label: t("form.liabilities"),
      children: [
        { name: "c1", label: t("form.shortTermLoans"), children: [] },
        { name: "c2", label: t("form.notesPayable"), children: [] },
        { name: "c3", label: t("form.employeeRights"), children: [] },
        { name: "c4", label: t("form.taxesDue"), children: [] },
        { name: "c5", label: t("form.mudarabahProfits"), children: [] },
        { name: "c6", label: t("form.customerDeposits"), children: [] },
        { name: "c7", label: t("form.generalReserves"), children: [] },
      ],
    },

    {
      name: "malikiAssets",
      label: t("form.malikiAssets"),
      children: [
        { name: "SPA", label: t("form.companyAssets") },
        { name: "SARL", label: t("form.personalAssets") },
        { name: "limit", label: t("form.insolvencyLimit") },
      ],
    },
  ];
};
