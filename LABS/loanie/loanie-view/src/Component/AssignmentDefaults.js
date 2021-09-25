export function assignmentDefaults(loanType) {
  const refDefs = [
    {
      text: 'Fill out Loan Application',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text:
        'Decide on your goals, Do you want to cash out equity or just improve terms/rate/payment?',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: '30 days of pay stubbs',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: '3 months of bank statements',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: '2 years tax returns',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'most recent tax statements for other property owned',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: '1099 and copy of business license if self-employed',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Explanation of any inquiries on credit (signed and dated)',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Copy of divorce decree and seperation agreement (if applicable)',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Current mortgage statement',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Copy of earnest money check (bank statement showing it cleared)',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Copy of drivers license or other gov. issued ID',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Insurance declaration page',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text:
        'Residency history for the past 2 years - address and phone number of each landlord or rental company',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Check for the appraisal or bank draft information',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Explanation of any assets used for down payment and closing costs - source of funds',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Copy of note, deed of trust and current mortgage information',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Consumer must pay for the appraisal $500-600',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Rate can be locked after appraisal - consumer must decide when to lock',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Review final disclosure',
      author: '1',
      phase: '4',
      complete: false,
    },
    {
      text:
        'Sign and return final disclosure (Ask any questions, get clarification - before signing and returning)',
      author: '1',
      phase: '4',
      complete: false,
    },
    {
      text:
        'Schedule Closing - Closing cannot take place within 3 days from the date the disclosure is signed',
      author: '1',
      phase: '4',
      complete: false,
    },
    {
      text: 'Show up and be prepared to sign your name at least 75 times',
      author: '1',
      phase: '5',
      complete: false,
    },
    {
      text: 'Get your money',
      author: '1',
      phase: '5',
      complete: false,
    },
    {
      text: 'Make your home improvements - pay down debt - whatever your plans were',
      author: '1',
      phase: '5',
      complete: false,
    },
    {
      text: 'Enjoy your life',
      author: '1',
      phase: '5',
      complete: false,
    },
  ];
  const conDefs = [
    {
      text: 'Fill out Loan Application',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Decide on your desired payment',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Look at your finances and see what your down payment amount will likely be (0 - 20%)',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Come up with a basic "wish list" on the property you are looking for',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Decide if you would like to use a Realtor',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Get an idea of your desired location',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Plan the size and location and cost of your new home',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Start the process to get pre-approved for the build plan',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Get starting time and construction time to Loan Officer',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Start to supply Loan Officer with documents',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Submit plans to lender',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Sign disclosures and return promptly',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: '30 days of pay stubs',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: '3 months of bank statements',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: '2 years tax returns',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'most recent tax statements for other property owned',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: '1099 and copy of business license if self-employed',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Explanation of any inquiries on credit (signed and dated)',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Copy of divorce decree and seperation agreement (if applicable)',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Current mortgage statement',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Copy of earnest money check (bank statement showing it cleared)',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Copy of drivers license or other gov. issued ID',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Insurance declaration page',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text:
        'Residency history for the past 2 years - address and phone number of each landlord or rental company',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Check for the appraisal or bank draft information',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Explanation of any assets used for down payment and closing costs - source of funds',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Consumer must pay for the appraisal $500-600',
      author: '1',
      phase: '4',
      complete: false,
    },
    {
      text: 'Rate can be locked after appraisal - consumer must decide when to lock',
      author: '1',
      phase: '4',
      complete: false,
    },
    {
      text: 'Review final disclosure',
      author: '1',
      phase: '5',
      complete: false,
    },
    {
      text:
        'Sign and return final disclosure (Ask any questions, get clarification - before signing and returning)',
      author: '1',
      phase: '5',
      complete: false,
    },
    {
      text:
        'Schedule Closing - Closing cannot take place within 3 days from the date the disclosure is signed',
      author: '1',
      phase: '5',
      complete: false,
    },
    {
      text: 'Show up and be prepared to sign your name at least 75 times',
      author: '1',
      phase: '6',
      complete: false,
    },
    {
      text: 'Contact your lender and builder if you have questions during this process.',
      author: '1',
      phase: '7',
      complete: false,
    },
    {
      text: 'Start making payments when required',
      author: '1',
      phase: '8',
      complete: false,
    },
    {
      text: 'Move in to your brand new home',
      author: '1',
      phase: '8',
      complete: false,
    },
    {
      text: 'Enjoy your life',
      author: '1',
      phase: '8',
      complete: false,
    },
  ];
  const newDefs = [
    {
      text: 'Fill out Loan Application',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Decide on your desired payment',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Look at your finances and see what your down payment amount will likely be (0 - 20%)',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Come up with a basic "wish list" on the property you are looking for',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Decide if you would like to use a Realtor',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Get an idea of your desired location',
      author: '1',
      phase: '1',
      complete: false,
    },
    {
      text: 'Get serious about credit and pre-approved for loan amount',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Give Loan Officer release to check credit',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Give Loan Officer 2 months of check stubbs',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Give Loan Officer 3 months of bank statements',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text:
        'Work on paying bills on time, saving for down payment and cleaning up credit if necessary',
      author: '1',
      phase: '2',
      complete: false,
    },
    {
      text: 'Make sure all previous documents are complete',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Send Loan officer all the following documents:',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Signed disclosures',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: '30 days of pay stubs',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: '3 months of bank statements',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: '2 years tax returns',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'most recent tax statements for other property owned',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: '1099 and copy of business license if self-employed',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Explanation of any inquiries on credit (signed and dated)',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Copy of divorce decree and seperation agreement (if applicable)',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Current mortgage statement',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Copy of earnest money check (bank statement showing it cleared)',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Copy of drivers license or other gov. issued ID',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Insurance declaration page',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text:
        'Residency history for the past 2 years - address and phone number of each landlord or rental company',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Check for the appraisal or bank draft information',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Explanation of any assets used for down payment and closing costs - source of funds',
      author: '1',
      phase: '3',
      complete: false,
    },
    {
      text: 'Consumer must pay for the appraisal $500-600',
      author: '1',
      phase: '4',
      complete: false,
    },
    {
      text: 'Rate can be locked after appraisal - consumer must decide when to lock',
      author: '1',
      phase: '4',
      complete: false,
    },
    {
      text: 'Review final disclosure',
      author: '1',
      phase: '5',
      complete: false,
    },
    {
      text:
        'Sign and return final disclosure (Ask any questions, get clarification - before signing and returning)',
      author: '1',
      phase: '5',
      complete: false,
    },
    {
      text:
        'Schedule Closing - Closing cannot take place within 3 days from the date the disclosure is signed',
      author: '1',
      phase: '5',
      complete: false,
    },
    {
      text: 'Show up and be prepared to sign your name at least 75 times',
      author: '1',
      phase: '6',
      complete: false,
    },
    {
      text: 'Get your keys, Move your stuff, Enjoy your life!',
      author: '1',
      phase: '6',
      complete: false,
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
