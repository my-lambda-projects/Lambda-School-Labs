module.exports = function toggleBooleans(newList) {
  const newBools = {};

  switch (newList) {
    case 'wishlist':
      newBools['submitted'] = false;
      newBools['onsiteInterview'] = false;
      newBools['receivedResponse'] = false;
      newBools['whiteboard'] = false;
      newBools['phoneInterview'] = false;
      newBools['codeTest'] = false;
      newBools['rejected'] = false;
      newBools['offer'] = false;
      newBools['open'] = false;
      break;
    case 'applied':
      newBools['submitted'] = true;
      newBools['onsiteInterview'] = false;
      newBools['receivedResponse'] = false;
      newBools['whiteboard'] = false;
      newBools['phoneInterview'] = false;
      newBools['codeTest'] = false;
      newBools['rejected'] = false;
      newBools['offer'] = false;
      newBools['open'] = true;
      break;
    case 'phone':
      newBools['submitted'] = true;
      newBools['onsiteInterview'] = false;
      newBools['receivedResponse'] = true;
      newBools['whiteboard'] = false;
      newBools['phoneInterview'] = true;
      newBools['codeTest'] = false;
      newBools['rejected'] = false;
      newBools['offer'] = false;
      newBools['open'] = true;
      break;
    case 'on site':
      newBools['submitted'] = true;
      newBools['onsiteInterview'] = true;
      newBools['receivedResponse'] = true;
      newBools['whiteboard'] = true;
      newBools['phoneInterview'] = true;
      newBools['codeTest'] = true;
      newBools['rejected'] = false;
      newBools['offer'] = false;
      newBools['open'] = true;
    break;
    case 'offer':
      newBools['submitted'] = true;
      newBools['onsiteInterview'] = true;
      newBools['receivedResponse'] = true;
      newBools['whiteboard'] = true;
      newBools['phoneInterview'] = true;
      newBools['codeTest'] = true;
      newBools['rejected'] = false;
      newBools['offer'] = true;
      break;
    case 'rejected':
      newBools['submitted'] = true;
      newBools['onsiteInterview'] = true;
      newBools['receivedResponse'] = true;
      newBools['whiteboard'] = true;
      newBools['phoneInterview'] = true;
      newBools['codeTest'] = true;
      newBools['rejected'] = true;
      newBools['offer'] = false;
      newBools['open'] = false;
      break;
    default:
      break;
  }

  return newBools;
}
