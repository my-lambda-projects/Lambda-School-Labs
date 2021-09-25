export function phaseDefaults(loanType) {
  const refDefs = [
    {
      phase: '1',
      phaseTitle: 'Starting Out Phase - Buyer gets pre-qualified',
      description: `This is the "just getting started" phase. You should meet with your 
      loan officer to find out how much home equity you have access to - or how you can 
      improve the terms of your current loan.`,
    },
    {
      phase: '2',
      phaseTitle: 'Documents Phase',
      description: `You've decided to move forward with your refinance, either to get 
      access to the equity in your home or save money on your rate or payment.`,
    },
    {
      phase: '3',
      phaseTitle: 'Appraisal -- Assess value of property involved in transaction',
      description: `Appraisal on the property is ordered and completed. Regulations 
      require the buyer to pay for the appraisal. A professional appraiser will 
      evaluate your property and compare it to other recent transactions in your market. 
      You're entitled to a copy of this report, so ask for it. You'll likely find it interesting.`,
    },
    {
      phase: '4',
      phaseTitle: 'Final Disclosure - Review Loan Terms prior to closing',
      description: `The final disclosure is a lengthy document that contains all the 
      terms of your loan. You should review this document thoroughly. In order to 
      guarantee that you have time to review the document, you must wait at least three 
      days from the time you sign and approve it and the time you close.`,
    },
    {
      phase: '5',
      phaseTitle: 'Closing - Loan is Funded and Recorded',
      description: `You'll arrive at the Title Company and be seated in a conference 
      room and asked to sign a stack of documents related to your mortgage. The title 
      company representative will watching you so feel free to ask questions.`,
    },
  ];
  const newDefs = [
    {
      phase: '1',
      phaseTitle: 'Starting Out Phase - Buyer gets pre-qualified',
      description: `This is the "just getting started" phase. You should meet 
    with your loan officer to thoroughly review your finances, your needs, 
    the market in your area, and all the other factors to make a plan. Home 
    ownership can be a journey. Your loan officer will be here every step of 
    the way, and so will we.`,
    },
    {
      phase: '2',
      phaseTitle: 'Shopping Phase - Buyer identifies desired home',
      description: `You've started shopping for a home. Maybe you're working 
    with a realtor, maybe you're own your own. Either way, there are some 
    things you should know. You've likely been "prequalified" for a home loan.
    Its now time to get "preapproved". Any realtor will tell you that offers 
    made by preapproved buyers are taken more seriously -- especially in 
    competitive markets, so its important to sit down with your loan officer,
    review your financial situation, and get that preapproval. TL:DR; 
    Preapproval comes with verification of debts/income/credit - Pre-qualification 
    is based only on a "best guess".`,
    },
    {
      phase: '3',
      phaseTitle: 'Documents Phase - Buyer has found a home',
      description: `After we have a property and the offer has been submitted and 
    accepted, its time to go to work. Your loan officer will need to collect a 
    TON of paperwork from you. It is important to know that banks employ teams of 
    professional nit-pickers to review these documents thoroughly, and they will 
    find some things that will require additional documentation. This is a normal 
    part of the process - be sure to provide any and all documentation to your 
    loan officer as quickly as possible.`,
    },
    {
      phase: '4',
      phaseTitle: 'Appraisal -- Assess value of property involved in transaction',
      description: `Appraisal on the property is ordered and completed. Regulations 
    require the buyer to pay for the appraisal. A professional appraiser will 
    evaluate your property and compare it to other recent transactions in your market. 
    You're entitled to a copy of this report, so ask for it. You'll likely find it 
    interesting.`,
    },
    {
      phase: '5',
      phaseTitle: 'Final Disclosure - Review Loan Terms prior to closing',
      description: `The final disclosure is a lengthy document that contains all the 
    terms of your loan. You should review this document thoroughly. In order to 
    guarantee that you have time to review the document, you must wait at least 
    three days from the time you sign and approve it and the time you close.`,
    },
    {
      phase: '6',
      phaseTitle: 'Closing - Loan is Funded and Recorded',
      description: `You'll arrive at the Title Company and be seated in a conference 
    room and asked to sign a stack of documents related to your mortgage. The title 
    company representative will watching you so feel free to ask questions.`,
    },
  ];
  const conDefs = [
    {
      phase: '1',
      phaseTitle: 'Starting Out Phase - Buyer gets pre-qualified',
      description: `This is the "just getting started" phase. You should meet 
    with your loan officer to thoroughly review your finances, your needs, 
    the market in your area, and all the other factors to make a plan. Home 
    ownership can be a journey. Your loan officer will be here every step of 
    the way, and so will we.`,
    },
    {
      phase: '2',
      phaseTitle: 'Pre-Plan with the builder',
      description: `Choose a builder and start planning for your home. If you 
    haven't already, you may want to include a Real Estate agent familiar with 
    building new construction homes in this process. Their commission will be 
    paid by the builder, and its nice to have someone in your corner for all 
    meetings with the builder to watch out for you.`,
    },
    {
      phase: '3',
      phaseTitle: 'Documents Phase - Builder is ready to begin',
      description: `After you have selected a builder and approved the plans, 
    it is time to go to work. Your loan officer will need to collect a TON 
    of paperwork from you. It is important to know that banks employ teams of 
    professional nit-pickers to review these documents thoroughly, and they will 
    find some things that will require additional documentation. This is a normal 
    part of the process - be sure to provide any and all documentation to your 
    loan officer as quickly as possible.`,
    },
    {
      phase: '4',
      phaseTitle: 'Appraisal -- Assess value of property involved in transaction',
      description: `Appraisal on the property is ordered and completed. Regulations 
    require the buyer to pay for the appraisal. A professional appraiser will 
    evaluate your property and compare it to other recent transactions in your market. 
    You're entitled to a copy of this report, so ask for it. You'll likely find it 
    interesting.`,
    },
    {
      phase: '5',
      phaseTitle: 'Final Disclosure - Review Loan Terms prior to closing',
      description: `The final disclosure is a lengthy document that contains all the 
    terms of your loan. You should review this document thoroughly. In order to 
    guarantee that you have time to review the document, you must wait at least 
    three days from the time you sign and approve it and the time you close.`,
    },
    {
      phase: '6',
      phaseTitle: 'Closing - Loan is Funded and Recorded',
      description: `You'll arrive at the Title Company and be seated in a conference 
    room and asked to sign a stack of documents related to your mortgage. The title 
    company representative will watching you so feel free to ask questions. Once 
    you've closed on your loan a construction account is set up with a bank. 
    Construction will begin and the builder will take periodic (monthly) draws from 
    the account. Funds will go through the title company to the builder. The Lender 
    will make periodic inspections to make sure the process is going well. Interest 
    charges won't begin until the first dispersal of funds, but you may be required 
    to make interest payments at this time.`,
    },
    {
      phase: '7',
      phaseTitle: 'Home Completed - You house is done!',
      description: `Your home is completed and account reconciled. The builder will 
    request a final draw on the contruction account and Builder and borrower will 
    reconcile final price based on any changes during construction. The Lender will 
    do a final inspection confirming completion of the home and a final appraisal may 
    be ordered at this time. Final payment is made to the builder after the borrowers
    authorization through the title company.`,
    },
    {
      phase: '8',
      phaseTitle: 'Permanent Mortgage Starts',
      description: `The construction loan is paid off with your approved mortgage 
    amount.`,
    },
  ];
  if (loanType === 'new') return newDefs;
  else if (loanType === 'refinance') return refDefs;
  else if (loanType === 'construction') return conDefs;
  return 'err';
}

export function foo() {
  return 'bar';
}
