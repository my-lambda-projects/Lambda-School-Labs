export const getMessagesForUser = (students) => {

    let messages = [];

    if (students && students.length > 0)
        {
            let issues = 0;

            students.forEach(student => {

                if (!student.courses)
                    {
                        issues += 1;
                        messages.push(student.first_name + " has not registered for any courses yet.");
                    }
            })

            if (issues === 0)
                { messages.push("You're all up to date."); }
        }
    else
        {
            messages.push("You don't have any students registered with us yet.")
        }

    return messages;
}