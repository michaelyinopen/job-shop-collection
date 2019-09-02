using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobShopCollection.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobShopCollection.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobSetsController : ControllerBase
    {
        private JobShopCollectionDbContext JobShopCollectionDbContext { get; }
        public JobSetsController(JobShopCollectionDbContext jobShopCollectionDbContext)
        {
            JobShopCollectionDbContext = jobShopCollectionDbContext;
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<RuleNodeHeaderDto>>> GetAll()
        //{
        //    var result = await FileToOrderDbContext.RuleNodeEntity
        //        .Where(r => !r.ParentRuleNodeId.HasValue)
        //        .ProjectTo<RuleNodeHeaderDto>(Mapper.ConfigurationProvider)
        //        .ToListAsync();
        //    return result.ToList();
        //}

        //[HttpGet("{id}")]
        //public async Task<ActionResult<RuleNodeDto>> Get(int id)
        //{
        //    var result = await FileToOrderDbContext.RuleNodeEntity
        //        .Where(r => !r.ParentRuleNodeId.HasValue)
        //        .Include(r => r.ChildRuleNodes)
        //        .ProjectTo<RuleNodeDto>(Mapper.ConfigurationProvider)
        //        .FirstOrDefaultAsync(r => r.Id == id);

        //    if (result is null)
        //        return NotFound();

        //    string eTag = result.GetETag();
        //    if (HttpContext.Request.Headers.Keys.Contains("If-None-Match") && HttpContext.Request.Headers["If-None-Match"].ToString() == eTag)
        //    {
        //        return new StatusCodeResult(304);//Not Modified
        //    }
        //    HttpContext.Response.Headers.Add("ETag", new[] { eTag });

        //    return result;
        //}

        //[HttpPost]
        //public async Task<ActionResult<RuleNodeDto>> Post([FromBody]NewRuleNodeDto newRuleNodeDto)
        //{
        //    //throw new System.Exception();
        //    var ruleNodeEntity = Mapper.Map<RuleNodeEntity>(newRuleNodeDto);
        //    FileToOrderDbContext.RuleNodeEntity.Add(ruleNodeEntity);
        //    await FileToOrderDbContext.SaveChangesAsync();

        //    var result = Mapper.Map<RuleNodeDto>(ruleNodeEntity);
        //    string eTag = result.GetETag();
        //    HttpContext.Response.Headers.Add("ETag", new[] { eTag });
        //    return CreatedAtAction("Get", new { id = ruleNodeEntity.Id }, result);
        //}

        //[HttpPut("{id}")]
        //public async Task<ActionResult<RuleNodeDto>> Put(int id, [FromBody]UpdateRuleNodeDto updateRuleNodeDto)
        //{
        //    if (!id.Equals(updateRuleNodeDto.Id))
        //        return BadRequest(new { Message = "The Id in route does not equal to the Id in Body." });
        //    //todo check child ruleNodes' id must be zero (default value)

        //    var newRuleNodeRepresentation = Mapper.Map<RuleNodeEntity>(updateRuleNodeDto);

        //    var current = await FileToOrderDbContext.RuleNodeEntity
        //        .Where(r => !r.ParentRuleNodeId.HasValue)
        //        .Include(r => r.ChildRuleNodes)
        //        .FirstOrDefaultAsync(r => r.Id == id);

        //    if (current is null)
        //        return NotFound();

        //    // the "If-Match" Header is mandatory
        //    if (!HttpContext.Request.Headers.Keys.Contains("If-Match") || HttpContext.Request.Headers["If-Match"].ToString() != current.GetETag())
        //    {
        //        return new StatusCodeResult(412); //precondition failed
        //    }

        //    SetDeleteStateOnChildRuleNodes(current);

        //    FileToOrderDbContext.Entry(current).CurrentValues.SetValues(newRuleNodeRepresentation);
        //    if (newRuleNodeRepresentation.ChildRuleNodes != null)
        //    {
        //        foreach (var childRuleNode in newRuleNodeRepresentation.ChildRuleNodes)
        //        {
        //            current.ChildRuleNodes.Add(childRuleNode);
        //        }
        //    }
        //    await FileToOrderDbContext.SaveChangesAsync();

        //    RuleNodeDto ruleNodeDto = Mapper.Map<RuleNodeDto>(current);
        //    string eTag = ruleNodeDto.GetETag();
        //    HttpContext.Response.Headers.Add("ETag", new[] { eTag });
        //    return Ok(ruleNodeDto);
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    var original = await FileToOrderDbContext.RuleNodeEntity
        //        .Where(r => !r.ParentRuleNodeId.HasValue)
        //        .Include(r => r.ChildRuleNodes)
        //        .FirstOrDefaultAsync(r => r.Id == id);

        //    if (original is null)
        //        return NotFound();

        //    // the "If-Match" Header is mandatory
        //    if (!HttpContext.Request.Headers.Keys.Contains("If-Match") || HttpContext.Request.Headers["If-Match"].ToString() != original.GetETag())
        //    {
        //        return new StatusCodeResult(412); //precondition failed
        //    }

        //    SetDeleteStateOnChildRuleNodes(original);

        //    FileToOrderDbContext.Entry(original).State = EntityState.Deleted;
        //    await FileToOrderDbContext.SaveChangesAsync();
        //    return Ok();
        //}
    }
}