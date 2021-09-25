import React from 'react';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import { startTest } from '../../../../../actions/userDashboardActions/placementActions';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../../../../../styles/BtnStyle';

const StartTest = ({ student }) => {
  const { id: studentID } = useParams();
  const dispatch = useDispatch();
  const { attempts } = student;

  delete student.enrolled;
  delete student.delinquent;
  delete student.student_id;
  delete student.parent_name;
  student = { ...student, attempts: attempts + 1 };

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Test Attempts: {student.attempts} / 3</h3>

      <h1>Primary Schoolers English Placement Test</h1>
      <h1>امتحان تحديد المستوى للمرحله الابتدائيه</h1>

      <p style={{ padding: '5% 5% 0 5%' }}>
        Dear student, We are so excited that you've signed up to join us at The Garden of Knowledge
        - Speak Out Program. We make learning effective and fun, and can't wait to see you in class.
        Here is a placement test to find out what your level is. Don't worry if you don't know an
        answer, just leave it blank DON'T guess. Don't worry about your results, we think you're a
        superstar already! Mum and dad, please don't help your child with their answers, and also
        don't read for them. If they can't read yet, that's ok, leave the test blank. Ready? Get
        set? GO!
      </p>
      <p style={{ padding: '0 5% 5% 5%' }}>
        عزيزي الطالب، نحن متحمسون للغاية لأنك قمت بالتسجيل للانضمام إلينا في Garden of Knowledge.
        نجعل التعلم فعالًا وممتعًا ، ولا يمكننا الانتظار لرؤيتك في الصف. اختبار تحديد المستوى لمعرفة
        مستواك. لا تقلق إذا كنت لا تعرف الإجابة ، فقط اتركها فارغة أولياء الأمور ، من فضلكم عدم
        مساعدة الطالب في الإجابه ، وعدم القراءة أيضا . إلا إذا لم يتمكن من القراءة حتى الآن ، يمكنك
        ترك الاختبار فارغًا ان لم تستطع الاجابه. جاهز؟ اجلس؟ ابدأ !
      </p>

      <div className="start-test-container">
        <h3>You have 45 minutes</h3>
        <PrimaryButton onClick={() => dispatch(startTest(studentID, student))}>Next</PrimaryButton>
      </div>
    </>
  );
};

export default StartTest;

