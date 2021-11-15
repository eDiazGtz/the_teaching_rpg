describe("LessonMaster", () => {
    let result;
    let spy;

    beforeEach(() => {
        LessonMaster.gameMaster = new GameMaster(null);
        spy = spyOn(document, "dispatchEvent");
    })
    
    it("should find the correct lesson", () =>{
        LessonMaster.gameMaster.mode = GameMaster.MODES.NORMAL;
        
        result = LessonMaster.presentLesson("summoning_scroll", "the_act");

        expect(result).not.toEqual(null);
        expect(LessonMaster.completedLessons.filter(lesson => lesson.slug === "summoning_scroll").length).toBe(1);
        expect(LessonMaster.lessons.filter(lesson => lesson.slug === "summoning_scroll").length).toBe(0);
        expect(spy).toHaveBeenCalled();
    })
})