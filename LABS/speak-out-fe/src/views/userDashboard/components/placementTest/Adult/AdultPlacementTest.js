import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const AdultPlacementTest = props => {
  const { push } = useHistory();
  return (
    <div>
      <h1>English in Mind Placement Test</h1>

      <p style={{ padding: '5% 5% 0 5%' }}>
        Welcome to your online placement test. You have 45 minutes to complete
        the test, you do not have to do it all, stop when you find that it
        becomes challenging. Don't worry to much about your results, we use this
        test to find your level, there is no fail mark. Good luck!
      </p>
      <p style={{ padding: '0 5% 5% 5%' }}>
        عزيزي الطالب مرحبًا بك في اختبار تحديد المستوى عبر الإنترنت. لديك 45
        دقيقة لإكمال الاختبار ، ليس عليك القيام بكل شيء ، وتوقف عندما تجد الأمر
        صعبًا، لا تقلق كثيرًا بشأن نتائجك ، فنحن نقدم هذا الاختبار لتحديد مستواك
        حظا سعيدا!
      </p>

      <Button
        onClick={() => push(`dashboard/placement/1`)}
        style={{ margin: '0 45%' }}
      >
        Start
      </Button>
    </div>
  );
};

export default AdultPlacementTest;
